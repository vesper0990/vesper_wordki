using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Wordki.Api.Repositories.EntityFrameworkRepositories;
using Wordki.Api.Services;
using Wordki.Infrastructure.Framework.ExceptionMiddleware;
using Wordki.Infrastructure.Framework.HandleTimeMiddleware;
using Wordki.Utils.Dapper;
using Wordki.Utils.Database;
using Wordki.Utils.HttpContext;
using Wordki.Utils.TimeProvider;

public static class ServicesConfiguration
{
    public static IServiceCollection ServicesConfig(this IServiceCollection services) =>
    services.AddScoped<ExceptionHandlerMiddleware>()
            .AddScoped<HandleTimeMiddleware>()
            .AddScoped<IDbConnectionProvider, DbConnectionProvider>()
            .AddScoped<ITimeProvider, TimeProvider>()
            .AddScoped<IMigrationProvider, MigrationProvider>()
            .AddScoped<IHttpContextProvider, HttpContextProvider>()
            .AddSingleton<IHttpContextAccessor, HttpContextAccessor>()
            .AddScoped<IDatabaseInitializer, DatabaseInitializer>()
            .AddScoped<IUserCreator, UserCreator>()
            .AddScoped<IDateTimeProvider, DateTimeProvider>()
            .AddScoped<IEncrypter, Encrypter>();

}