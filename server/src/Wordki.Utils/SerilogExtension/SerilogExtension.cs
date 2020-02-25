using System;

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
                collection.AddSingleton<ITimeProvider, DateTimeWrapper>();
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
                collection.AddSingleton(services => (ILoggerFactory) new SerilogLoggerFactory(Log.Logger, true));
            });
            return builder;
        }
    }