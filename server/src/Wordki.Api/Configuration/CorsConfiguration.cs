using Microsoft.Extensions.DependencyInjection;

public static class CorsConfiguration
{
    public static IServiceCollection CorsConfig(this IServiceCollection services)
    {
        return services.AddCors(options => options.AddPolicy("AllowAll", p => p.AllowAnyOrigin()
                                                                    .AllowAnyMethod()
                                                                     .AllowAnyHeader()));
    }
}