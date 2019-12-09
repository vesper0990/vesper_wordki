using Autofac;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using NLog.Extensions.Logging;
using NLog.Web;
using Wordki.Infrastructure.Framework.ExceptionMiddleware;
using Wordki.Utils.TimeProvider;
using Wordki.Core;
using Wordki.Infrastructure.Settings;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Wordki.Commands;
using Wordki.Queries;
using Wordki.Infrastructure;
using Wordki.Utils.Dapper;
using Microsoft.Extensions.Hosting;
using Wordki.Utils.Database;
using System;

namespace Wordki
{
    public class Startup
    {
        public IContainer ApplicationContainer { get; private set; }
        public IWebHostEnvironment HostingEnvironment { get; }
        public IConfiguration Configuration { get; }

        public Startup(IWebHostEnvironment hostingEnvironment)
        {
            HostingEnvironment = hostingEnvironment;
            var builder = new ConfigurationBuilder()
                .SetBasePath(HostingEnvironment.ContentRootPath)
                .AddJsonFile($"appsettings.{HostingEnvironment.EnvironmentName}.json", true, true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<JwtSettings>(options => Configuration.GetSection("Jwt").Bind(options))
                .Configure<DapperSettings>(options => Configuration.GetSection("Dapper").Bind(options));

            var jwtSettings = Configuration.GetSection("Jwt").Get<JwtSettings>();
            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(x =>
            {
                x.RequireHttpsMetadata = false;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(jwtSettings.Secret)),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });
            services.AddCors(options => options.AddPolicy("AllowAll", p => p.AllowAnyOrigin()
                                                                    .AllowAnyMethod()
                                                                     .AllowAnyHeader()));
            services.AddMvc(options =>
            {
                options.EnableEndpointRouting = false;
            });
            services.AddScoped<ExceptionHandlerMiddleware>();
            services.AddScoped<IDbConnectionProvdier, DbConnectionProvider>();
            services.AddScoped<ITimeProvider, TimeProvider>();
            services.AddScoped<IMigrationProvider, MigrationProvider>();
        }

        public void ConfigureContainer(ContainerBuilder builder)
        {
            builder.RegisterModule<CommandModule>();
            builder.RegisterModule<QueryModule>();
            builder.RegisterModule<InfrastructureModule>();
            builder.RegisterModule<CoreModule>();
        }


        public void Configure(IApplicationBuilder app)
        {
            app.UseCors("AllowAll");
            app.UseMiddleware<ExceptionHandlerMiddleware>();
            app.UseAuthentication();
            app.UseMvc();
            //var migrationProvider = app.ApplicationServices.GetService<IMigrationProvider>();
            //migrationProvider.Migrate("192.168.99.100", 3306, "Wordki", "vesper0990", "pass2");

            var appLifeTime = app.ApplicationServices.GetService<IHostApplicationLifetime>();
            appLifeTime.ApplicationStopped.Register(() => ApplicationContainer.Dispose());
        }
    }
}
