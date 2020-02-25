using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Wordki.Infrastructure.Framework.ExceptionMiddleware;
using Wordki.Utils.Dapper;
using Wordki.Utils.Database;
using Wordki.Utils.HttpContext;
using Wordki.Utils.TimeProvider;

public static class ServicesConfiguration
{
    public static IServiceCollection ServicesConfig(this IServiceCollection services) =>
    services.AddScoped<ExceptionHandlerMiddleware>()
            .AddScoped<IDbConnectionProvider, DbConnectionProvider>()
            .AddScoped<ITimeProvider, TimeProvider>()
            .AddScoped<IMigrationProvider, MigrationProvider>()
            .AddScoped<IHttpContextProvider, HttpContextProvider>()
            .AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
}