using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

public static class LoggingConfiguration
{
    public static IServiceCollection LoggingConfig(this IServiceCollection services)
    {
        services.AddLogging(loggingBuilder => loggingBuilder
                    .AddConsole()
                    .AddDebug()
                    .SetMinimumLevel(LogLevel.Information));
        return services;
    }
}