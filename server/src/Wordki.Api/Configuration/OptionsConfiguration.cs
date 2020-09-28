using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Wordki.Api.Repositories.EntityFrameworkRepositories;
using Wordki.Infrastructure.Settings;
using Wordki.Utils.Dapper;
using Wordki.Utils.Database;

public static class OptionsConfiguration
{
    public static IServiceCollection OptionConfig(this IServiceCollection services, IConfiguration config)
     => services.Configure<JwtSettings>(options => config.GetSection("Jwt").Bind(options))
                .Configure<DapperSettings>(options => config.GetSection("Dapper").Bind(options))
                .Configure<MigrationSettings>(options => config.GetSection("Migrations").Bind(options))
                .Configure<DatabaseConfig>(options => config.GetSection("DatabaseConfig").Bind(options));
}