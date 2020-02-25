using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Versioning;
using Microsoft.Extensions.DependencyInjection;

public static class VersioningConfiguration
{
    public static IServiceCollection VersioningConfig(this IServiceCollection services) =>
     services.AddApiVersioning(config =>
        {
            config.DefaultApiVersion = new ApiVersion(1, 0);
            config.AssumeDefaultVersionWhenUnspecified = true;
            config.ReportApiVersions = true;
            config.ApiVersionReader = new HeaderApiVersionReader("X-version");
        });

}