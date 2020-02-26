using Microsoft.Extensions.DependencyInjection;

public static class MvcConfiguration
{
    public static IServiceCollection MvcConfig(this IServiceCollection services)
    {
        services.AddMvc(options =>
            {
                options.EnableEndpointRouting = true;
            });
        return services;
    }
}