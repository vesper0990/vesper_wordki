using Autofac;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Wordki.Infrastructure.Framework.ExceptionMiddleware;
using Wordki.Core;
using Wordki.Commands;
using Wordki.Queries;
using Wordki.Infrastructure;
using Microsoft.Extensions.Hosting;

namespace Wordki
{
    public class Startup
    {
        public IContainer ApplicationContainer { get; private set; }
        public IConfiguration Configuration { get; }

        public Startup(IWebHostEnvironment hostingEnvironment)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(hostingEnvironment.ContentRootPath)
                .AddJsonFile($"appsettings.{hostingEnvironment.EnvironmentName}.json", true, true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services
                .OptionConfig(Configuration)
                .JwtConfig(Configuration)
                .CorsConfig()
                .LoggingConfig()
                .ServicesConfig();
        }

        public void ConfigureContainer(ContainerBuilder builder)
        {
            builder.RegisterModule<CoreModule>();
            builder.RegisterModule<InfrastructureModule>();
            builder.RegisterModule<CommandModule>();
            builder.RegisterModule<QueryModule>();
        }

        public void Configure(IApplicationBuilder app)
        {
            app.UseCors("AllowAll");
            app.UseMiddleware<ExceptionHandlerMiddleware>();
            app.UseAuthentication();
            app.UseMvc();

            var appLifeTime = app.ApplicationServices.GetService<IHostApplicationLifetime>();
            appLifeTime.ApplicationStopped.Register(() => ApplicationContainer.Dispose());
        }
    }
}
