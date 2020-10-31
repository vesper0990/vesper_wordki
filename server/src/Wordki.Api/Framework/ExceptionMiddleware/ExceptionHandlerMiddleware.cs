using System;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using NLog;

namespace Wordki.Infrastructure.Framework.ExceptionMiddleware
{
    public class ExceptionHandlerMiddleware : IMiddleware
    {
        private readonly ILogger<ExceptionHandlerMiddleware> logger;

        public ExceptionHandlerMiddleware(ILogger<ExceptionHandlerMiddleware> logger)
        {
            this.logger = logger;
        }

        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            try
            {
                await next(context);
            }
            catch(ApiException ex)
            {
                logger.LogError("Exception {exception}", ex, context.Request.PathBase);
                var result = JsonConvert.SerializeObject(new { message = ex.Message, code = ex.Code.ToString() });
                context.Response.ContentType = "application/json";
                context.Response.StatusCode = (int)HttpStatusCode.BadRequest;
                await context.Response.WriteAsync(result);
            }
            catch(Exception ex)
            {
                logger.LogError("Exception {exception}", ex, context.Request.PathBase);
                var result = JsonConvert.SerializeObject(new { error = ex.Message });
                context.Response.ContentType = "application/json";
                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                await context.Response.WriteAsync(result);
            }
        }
    }
}