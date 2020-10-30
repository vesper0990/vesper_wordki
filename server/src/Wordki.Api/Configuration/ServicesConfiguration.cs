using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Wordki.Api.Repositories.EntityFrameworkRepositories;
using Wordki.Api.Services;
using Wordki.Infrastructure.Framework.ExceptionMiddleware;
using Wordki.Infrastructure.Framework.HandleTimeMiddleware;
using Wordki.Utils.HttpContext;

public static class ServicesConfiguration
{
    public static IServiceCollection ServicesConfig(this IServiceCollection services) =>
    services.AddScoped<ExceptionHandlerMiddleware>()
            .AddScoped<HandleTimeMiddleware>()
            .AddScoped<IHttpContextProvider, HttpContextProvider>()
            .AddSingleton<IHttpContextAccessor, HttpContextAccessor>()
            .AddScoped<IUserCreator, UserCreator>()
            .AddScoped<IDateTimeProvider, DateTimeProvider>()
            .AddScoped<IDatabaseInitializer, DatabaseInitializer>()
            .AddScoped<IEncrypter, Encrypter>();

}