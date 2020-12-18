using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Serilog;
using Wordki.Api.Repositories.EntityFrameworkRepositories;
using Wordki.Api.Services;
using Wordki.Infrastructure.Framework.ExceptionMiddleware;
using Wordki.Infrastructure.Framework.HandleTimeMiddleware;
using Wordki.Utils.HttpContext;
using Wordki.Utils.TimeProvider;

public static class ServicesConfiguration
{
    public static IServiceCollection ServicesConfig(this IServiceCollection services, IConfiguration configuration)
    {
        return services.AddScoped<ExceptionHandlerMiddleware>()
            .AddScoped<HandleTimeMiddleware>()
            .AddSingleton<IHttpContextAccessor, HttpContextAccessor>()
            .AddScoped<IHttpContextProvider, HttpContextProvider>()
            .AddScoped<IUserCreator, UserCreator>()
            .AddScoped<ITimeProvider, TimeProvider>()
            .AddScoped<IDatabaseInitializer, DatabaseInitializer>()
            .AddScoped<IAuthenticationService, AuthenticationService>()
            .AddScoped<IEncrypter, Encrypter>()
            .AddScoped<INextRepeatCalculator, NextRepeatCalculator>()
            .AddIConnectionStringProvider(configuration);
    }

    private static IServiceCollection AddIConnectionStringProvider(this IServiceCollection services, IConfiguration configuration)
    {
        const string envTag = "ENVIRONMENT";
        var envrionment = configuration.GetValue<string>(envTag);
        if (string.IsNullOrEmpty(envrionment))
        {
            Log.Error($"There is no {envTag} in configuration");
            throw new System.Exception($"There is no {envTag} in configuration");
        }

        return envrionment.Equals("Production")
            ? services.AddSingleton<IConnectionStringProvider, HerokuConnectionStringProvider>()
            : services.AddSingleton<IConnectionStringProvider, SimpleConnectionStringProvider>();
    }
}