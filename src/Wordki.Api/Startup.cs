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
using Microsoft.Extensions.Logging.Console;

namespace Wordki
{
    public class Startup : IStartup
    {

        public IContainer ApplicationContainer { get; private set; }
        public IHostingEnvironment HostingEnvironment { get; }
        public IConfiguration Configuration { get; }

        public Startup(IHostingEnvironment hostingEnvironment)
        {
            HostingEnvironment = hostingEnvironment;
            var builder = new ConfigurationBuilder()
                .SetBasePath(HostingEnvironment.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        IServiceProvider IStartup.ConfigureServices(IServiceCollection services)
        {
            if (HostingEnvironment.IsEnvironment("Testing"))
            {
                services.AddDbContext<WordkiDbContext>(options =>
                //options.UseInMemoryDatabase("testDb").EnableSensitiveDataLogging()
                options.UseMySql(@"Server=localhost;Port=3307;database=unittests;uid=root;pwd=Akuku123;").EnableSensitiveDataLogging()
                );
            }
            else
            {
                services.AddDbContext<WordkiDbContext>(options =>
                {
#if Debug
                    options.UseMySql(@"Server=localhost;database=test;uid=root;pwd=Akuku123;").EnableSensitiveDataLogging();

#else
                options.UseMySql(@"Server=dbServer;database=wordki;uid=root;pwd=Akuku123;");
#endif
                });
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
