using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Wordki.Infrastructure.Framework.ExceptionMiddleware;
using Wordki.Infrastructure.Framework.HandleTimeMiddleware;
using Wordki.Api.Repositories.EntityFrameworkRepositories;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;
using MediatR;
using System.Text.Json.Serialization;
using Microsoft.Extensions.Logging;
using Wordki.Api.Domain2;

namespace Wordki
{
    public class Startup
    {
        private readonly ILogger<Startup> logger;
        private readonly IConfiguration configuration;

        public Startup(IWebHostEnvironment hostingEnvironment, ILogger<Startup> logger)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(hostingEnvironment.ContentRootPath)
                .AddJsonFile($"appsettings.{hostingEnvironment.EnvironmentName}.json", true, true)
                .AddEnvironmentVariables();
            configuration = builder.Build();
            this.logger = logger;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services
                .OptionConfig(configuration)
                .JwtConfig(configuration)
                .CorsConfig()
                .LoggingConfig(configuration)
                .ServicesConfig(configuration)
                .AddDbContext<WordkiDbContext>()
                .AddDbContext<WordkiDbContext2>()
                .AddMediatR(typeof(Startup).Assembly)
                .AddMvc(o =>
                {
                    o.EnableEndpointRouting = false;
                    o.Filters.Add(typeof(ValidatorActionFilter));
                })
                .AddJsonOptions(opt =>
                {
                    opt.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
                })
                .AddFluentValidation(f => f.RegisterValidatorsFromAssemblyContaining<Startup>());
        }

        public void Configure(IApplicationBuilder app)
        {
            app.UseCors("AllowAll");
            app.UseCors(builder => builder.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());
            app.UseMiddleware<ExceptionHandlerMiddleware>();
            app.UseMiddleware<HandleTimeMiddleware>();
            app.UseAuthentication();
            app.UseMvc();
        }
    }

    public class ValidatorActionFilter : IActionFilter
    {
        public void OnActionExecuting(ActionExecutingContext filterContext)
        {
            if (!filterContext.ModelState.IsValid)
            {
                filterContext.Result = new BadRequestObjectResult(filterContext.ModelState);
            }
        }
        public void OnActionExecuted(ActionExecutedContext filterContext)
        {

        }
    }
}
