using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
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
            .AddScoped<IHttpContextProvider, HttpContextProvider>()
            .AddSingleton<IHttpContextAccessor, HttpContextAccessor>()
            .AddScoped<IUserCreator, UserCreator>()
            .AddScoped<IDateTimeProvider, DateTimeProvider>()
            .AddScoped<ITimeProvider, TimeProvider>()
            .AddScoped<IDatabaseInitializer, DatabaseInitializer>()
            .AddScoped<IAuthenticationService, AuthenticationService>()
            .AddScoped<IEncrypter, Encrypter>()
            .AddIConnectionStringProvider(configuration);
    }

    private static IServiceCollection AddIConnectionStringProvider(this IServiceCollection services, IConfiguration configuration)
    {
        return "Production".Equals(configuration.GetValue<string>("ENVIRONMENT"))
            ? services.AddSingleton<IConnectionStringProvider, HerokuConnectionStringProvider>()
            : services.AddSingleton<IConnectionStringProvider, SimpleConnectionStringProvider>();
    }
}