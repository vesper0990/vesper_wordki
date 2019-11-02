using System;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using NLog;

namespace Wordki.Infrastructure.Framework.ExceptionMiddleware
{
    public class ExceptionHandlerMiddleware : IMiddleware
    {
        private static readonly Logger logger = LogManager.GetCurrentClassLogger();

        private string CollectExceptionsInformation(Exception exception)
        {
            if(exception.InnerException == null)
            {
                return $"'{exception.Message}'\n";
            }
            string result = $"'{exception.Message}'\n{CollectExceptionsInformation(exception.InnerException)}";
            return result;
        }

        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            try
            {
                await next(context);
            }
            catch (ApiException ex)
            {
                await HandleApiExceptionAsync(context, ex);
            }
            catch(Exception ex)
            {
                logger.Error(ex);
                await HandleUnexpectedExceptionAsync(context, ex);
            }
        }

        private async Task HandleApiExceptionAsync(HttpContext context, ApiException ex)
        {
            var response = new ExceptionDto
            {
                Message = ex.Message,
                Code = (int)ex.Code
            };
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)HttpStatusCode.BadRequest;
            await context.Response.WriteAsync(response.Message);
        }

        private async Task HandleUnexpectedExceptionAsync(HttpContext context, Exception ex)
        {
            var response = new ExceptionDto
            {
                Message = $"An unexpected exception occured: {ex.Message}",
                Code = (int)ErrorCode.Default
            };
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
            await context.Response.WriteAsync(response.Message);
        }
    }
}