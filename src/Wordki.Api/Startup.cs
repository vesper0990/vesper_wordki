using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Autofac;
using Autofac.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using NLog.Extensions.Logging;
using Wordki.Infrastructure.Services;
using Wordki.Infrastructure.IoC.Modules;
using Wordki.Infrastructure.Mapper;
using NLog.Web;
using Wordki.Infrastructure.EntityFramework;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using System;
using Wordki.Infrastructure.Settings;
using NLog;

namespace Wordki
{
    public class Startup : IStartup
    {

        private static readonly Logger logger = LogManager.GetCurrentClassLogger();

        public IContainer ApplicationContainer { get; private set; }
        public IHostingEnvironment HostingEnvironment { get; }
        public IConfiguration Configuration { get; }

        public Startup(IHostingEnvironment hostingEnvironment)
        {
            HostingEnvironment = hostingEnvironment;
            var builder = new ConfigurationBuilder()
                .SetBasePath(HostingEnvironment.ContentRootPath)
#if Debug
                .AddJsonFile("settings.debug.json", optional: true, reloadOnChange: true)
#else
                .AddJsonFile("settings.release.json", optional: true, reloadOnChange: true)
#endif
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        IServiceProvider IStartup.ConfigureServices(IServiceCollection services)
        {
            var config = Configuration.GetSection("General").Get<GeneralSettings>();
            switch (config.Database)
            {
                case DatabaseType.InMemory:
                    {
                        logger.Error("InMemory database initialization");
                        services.AddDbContext<WordkiDbContext>(options =>
                            options.UseInMemoryDatabase("memoryDatabase").EnableSensitiveDataLogging()
                        );
                        break;
                    }
                case DatabaseType.MySql:
                    {
                        logger.Error($"Connection to MySql database with conntectionString: {config.ConnectionString}");
                        services.AddDbContext<WordkiDbContext>(options =>
                            options.UseMySql(config.ConnectionString).EnableSensitiveDataLogging()
                        );
                        break;
                    }
                default:
                    throw new Exception("No info about database in settings file");
            }

            services.AddCors(options => options.AddPolicy("AllowAll", p => p.AllowAnyOrigin()
                                                             .AllowAnyMethod()
                                                              .AllowAnyHeader()));
            services.AddTransient<Api.Framework.ExceptionHandlerMiddleware>();
            services.AddAutofac();
            services.AddMvc();

            var builder = new ContainerBuilder();
            builder.Populate(services);
            builder.RegisterModule(new SettingsModule(Configuration));
            builder.RegisterInstance(AutoMapperConfig.Initialize()).SingleInstance();
            builder.RegisterModule<ServicesModule>();
            builder.RegisterModule(new SettingsModule(Configuration));
            builder.RegisterModule<RepositoryModule>();
            ApplicationContainer = builder.Build();

            return new AutofacServiceProvider(ApplicationContainer);
        }


        public void Configure(IApplicationBuilder app)
        {
            var env = app.ApplicationServices.GetService<IHostingEnvironment>();
            var loggerFactory = app.ApplicationServices.GetService<ILoggerFactory>();
            var appLifeTime = app.ApplicationServices.GetService<IApplicationLifetime>();

            loggerFactory.AddNLog();
            env.ConfigureNLog("nlog.config");

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                //app.UseBrowserLink();
                app.UseDatabaseErrorPage();
            }
            else
            {
                //app.UseExceptionHandler("/Home/Error");
            }
            app.UseCors("AllowAll");
            app.UseMiddleware(typeof(Api.Framework.ExceptionHandlerMiddleware));
            app.UseStaticFiles();
            app.UseAuthentication();
            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });

            var dataInitializer = app.ApplicationServices.GetService<IDataInitializer>();
            dataInitializer.Init();


            appLifeTime.ApplicationStopped.Register(() => ApplicationContainer.Dispose());
        }
    }
}
