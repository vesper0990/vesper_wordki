using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

public static class LoggingConfiguration
{
    public static IServiceCollection LoggingConfig(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddLogging(loggingBuilder => loggingBuilder
        .AddSeq(configuration.GetSection("Seq"))
                    .AddConsole()
                    .AddDebug()
                    .SetMinimumLevel(LogLevel.Information));
        return services;
    }
}