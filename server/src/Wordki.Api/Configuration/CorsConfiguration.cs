using Microsoft.Extensions.DependencyInjection;

public static class CorsConfiguration
{
    public static IServiceCollection CorsConfig(this IServiceCollection services)
    {
        services.AddCors(options => options.AddPolicy("AllowAll", p => p.AllowAnyOrigin()
                                                                    .AllowAnyMethod()
                                                                     .AllowAnyHeader()));
        return services;
    }
}