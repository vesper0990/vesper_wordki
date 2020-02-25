using Microsoft.Extensions.DependencyInjection;

public static class MvcConfiguration
{
    public static IServiceCollection MvcConfig(this IServiceCollection services)
    {
        services.AddMvc(options =>
            {
                options.EnableEndpointRouting = false;
            });
        return services;
    }
}