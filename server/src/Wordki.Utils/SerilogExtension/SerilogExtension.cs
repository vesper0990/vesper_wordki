using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Serilog;
using Serilog.Configuration;
using System;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Logging;
using Serilog.AspNetCore;
using System.Threading.Tasks;
using Microsoft.Extensions.Primitives;
using Serilog.Context;
using Serilog.Core;
using Wordki.Utils.TimeProvider;
using Serilog.Events;
using System.Linq;

public static class LoggerEnrichmentConfigurationExtensions
{
   public static LoggerConfiguration WithInternalCorrelationId(
       this LoggerEnrichmentConfiguration enrichmentConfiguration, IServiceProvider serviceProvider)
   {
       var enricher = serviceProvider.GetService<InternalCorrelationIdEnricher>();
       return enrichmentConfiguration.With(enricher);
   }

   public static LoggerConfiguration WithHttpContextContent(
       this LoggerEnrichmentConfiguration enrichmentConfiguration, IServiceProvider serviceProvider)
   {
       var enricher = serviceProvider.GetService<HttpContextContentEnricher>();
       return enrichmentConfiguration.With(enricher);
   }

   public static LoggerConfiguration WithUserName(
       this LoggerEnrichmentConfiguration enrichmentConfiguration, IServiceProvider serviceProvider)
   {
       var enricher = serviceProvider.GetService<UserNameEnricher>();
       return enrichmentConfiguration.With(enricher);
   }

   public static LoggerConfiguration WithDayOfWeek(
       this LoggerEnrichmentConfiguration enrichmentConfiguration, IServiceProvider serviceProvider)
   {
       var enricher = serviceProvider.GetService<DayOfWeekEnricher>();
       return enrichmentConfiguration.With(enricher);
   }
}

public static class WebhostBuilderExtensions
{
   public static IWebHostBuilder UseSerilog(this IWebHostBuilder builder, IConfiguration configuration)
   {
       builder.ConfigureServices((context, collection) =>
       {
           collection.TryAddSingleton<IHttpContextAccessor, HttpContextAccessor>();
           collection.AddSingleton<InternalCorrelationIdEnricher>();
           collection.AddSingleton<UserNameEnricher>();
           collection.AddSingleton<HttpContextContentEnricher>();
           collection.AddSingleton<DayOfWeekEnricher>();

           var serviceProvider = collection.BuildServiceProvider();
           Log.Logger = new LoggerConfiguration()
               .ReadFrom.Configuration(configuration)
               .Enrich.WithInternalCorrelationId(serviceProvider)
               .Enrich.WithUserName(serviceProvider)
               .Enrich.WithMachineName()
               .Enrich.WithEnvironmentUserName()
               .Enrich.WithHttpContextContent(serviceProvider)
               .Enrich.WithDayOfWeek(serviceProvider)
               .CreateLogger();
           collection.AddSingleton(services => (ILoggerFactory)new Serilog.Extensions.Logging.SerilogLoggerFactory(Log.Logger, true));
       });
       return builder;
   }
}

public class SerilogMiddleware
{
    public const string CORRELATION_ID_TAG = "InternalCorrelationId";
    private readonly RequestDelegate _next;
    private readonly ILogger<SerilogMiddleware> _logger;

    public SerilogMiddleware(RequestDelegate next, ILogger<SerilogMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }
    public Task Invoke(HttpContext context)
    {
        var correlationId = StringValues.Empty;

        if (!context.Request.Headers.TryGetValue(CORRELATION_ID_TAG, out correlationId))
        {
            _logger.LogWarning("Request do not have ConnectionId in its header!");
            return _next.Invoke(context);
        }

        using (LogContext.PushProperty(CORRELATION_ID_TAG, correlationId[0]))
        {
            return _next.Invoke(context);
        }
    }
}

public class DayOfWeekEnricher : ILogEventEnricher
{
    private const string PropertyName = "DayOfWeek";
    private readonly ITimeProvider _timeProvider;



    public DayOfWeekEnricher(ITimeProvider timeProvider)
    {
        _timeProvider = timeProvider;
    }

    public void Enrich(LogEvent logEvent, ILogEventPropertyFactory propertyFactory)
    {
        var day = _timeProvider.GetTime().DayOfWeek;
        var property = new LogEventProperty(PropertyName, new ScalarValue(day));

        logEvent.AddOrUpdateProperty(property);
    }


}

public class HttpContextContentEnricher : ILogEventEnricher
{
    private readonly IHttpContextAccessor _httpContextAccessor;
    private Func<IHttpContextAccessor, object> _customAction = null;

    public HttpContextContentEnricher(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
        _customAction = StandardEnricher;  // by default

    }
    public void SetCustomAction(Func<IHttpContextAccessor, object> customAction)
    {
        _customAction = customAction;
    }

    public void Enrich(LogEvent logEvent, ILogEventPropertyFactory propertyFactory)
    {
        HttpContext ctx = _httpContextAccessor.HttpContext;
        if (ctx == null) return;

        var httpContextCache = ctx.Items[$"serilog-enrichers-aspnetcore-httpcontext"];

        if (httpContextCache == null)
        {
            httpContextCache = _customAction.Invoke(_httpContextAccessor);
            ctx.Items[$"serilog-enrichers-aspnetcore-httpcontext"] = httpContextCache;
        }
        logEvent.AddPropertyIfAbsent(propertyFactory.CreateProperty("HttpContext", httpContextCache, true));
    }

    public static object StandardEnricher(IHttpContextAccessor hca)
    {
        var ctx = hca.HttpContext;
        if (ctx == null) return null;

        var httpContextCache = new HttpContextCache
        {
            IpAddress = ctx.Connection.RemoteIpAddress?.ToString(),
            Host = ctx.Request.Host.ToString(),
            Path = ctx.Request.Path.ToString(),
            IsHttps = ctx.Request.IsHttps,
            Scheme = ctx.Request.Scheme,
            Method = ctx.Request.Method,
            ContentType = ctx.Request.ContentType,
            Protocol = ctx.Request.Protocol,
            QueryString = ctx.Request.QueryString.ToString(),
        };

        return httpContextCache;
    }
}

public class HttpContextCache
{
    public string IpAddress { get; set; }
    public string Host { get; set; }
    public string Path { get; set; }
    public bool IsHttps { get; set; }
    public string Scheme { get; set; }
    public string Method { get; set; }
    public string ContentType { get; set; }
    public string Protocol { get; set; }
    public string QueryString { get; set; }

}

public class InternalCorrelationIdEnricher : ILogEventEnricher
{
    private const string correlationIdTag = "InternalCorrelationId";
    private readonly IHttpContextAccessor _httpContextAccessor;

    public InternalCorrelationIdEnricher(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    public void Enrich(LogEvent logEvent, ILogEventPropertyFactory propertyFactory)
    {
        HttpContext context = _httpContextAccessor.HttpContext;
        if (context == null)
        {
            return;
        }

        var correlationId = GetHeaderValue(context, correlationIdTag);
        if (correlationId == string.Empty)
        {
            logEvent.AddPropertyIfAbsent(propertyFactory.CreateProperty(correlationIdTag, "Not Found"));
            return;
        }

        logEvent.AddPropertyIfAbsent(propertyFactory.CreateProperty(correlationIdTag, correlationId));
    }

    public static string GetHeaderValue(HttpContext context, string headerKey)
        {
            if (!context.Request.Headers.TryGetValue(headerKey, out StringValues headerValue))
            {
                return string.Empty;
            }
            return headerValue.First();
        }
}

public class UserNameEnricher : ILogEventEnricher
{
    private const string UserPropertyName = "UserName";
    private readonly IHttpContextAccessor httpContextAccessor;



    public UserNameEnricher(IHttpContextAccessor httpContextAccessor)
    {
        this.httpContextAccessor = httpContextAccessor;
    }

    public void Enrich(LogEvent logEvent, ILogEventPropertyFactory propertyFactory)
    {
        if (httpContextAccessor.HttpContext == null)
        {
            return;
        }

        var requestUserName = httpContextAccessor.HttpContext.User.Claims.FirstOrDefault(claim => claim.Type == "username");

        var name = requestUserName == null ? string.Empty : requestUserName.Value;
        var property = new LogEventProperty(UserPropertyName, new ScalarValue(name));

        logEvent.AddOrUpdateProperty(property);
    }


}