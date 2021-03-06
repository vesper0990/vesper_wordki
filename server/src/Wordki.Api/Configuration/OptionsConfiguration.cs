using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Wordki.Api.Framework.Options;
using Wordki.Api.Repositories.EntityFrameworkRepositories;
using Wordki.Api.Services;
using Wordki.Utils.Database;

public static class OptionsConfiguration
{
    public static IServiceCollection OptionConfig(this IServiceCollection services, IConfiguration config)
     => services.Configure<MigrationSettings>(options => config.GetSection("Migrations").Bind(options))
                .Configure<JwtSettings>(options => config.GetSection("Jwt").Bind(options))
                .Configure<General>(options => config.GetSection("General").Bind(options))
                .Configure<DatabaseConfig>(options => config.GetSection("DatabaseConfig").Bind(options));
}