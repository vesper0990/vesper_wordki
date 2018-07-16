using System;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using NLog;

namespace Wordki.Api.Framework
{
    public class ExceptionHandlerMiddleware : IMiddleware
    {
        private static readonly Logger logger = LogManager.GetCurrentClassLogger();

        private Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            var errorCode = ErrorCode.Default;
            var statusCode = HttpStatusCode.BadRequest;
            var exceptionType = exception.GetType();
            switch (exception)
            {
                case Exception e when exceptionType == typeof(Exception):
                    logger.Error(exception, $"Message: {exception.Message} | StackTrace: {exception.StackTrace}");
                    statusCode = HttpStatusCode.BadRequest;
                    break;
                case ApiException e when exceptionType == typeof(ApiException):
                    statusCode = HttpStatusCode.InternalServerError;
                    errorCode = e.Code;
                    break;
            }
            var response = new { code = errorCode, message = CollectExceptionsInformation(exception) };
            var payload = JsonConvert.SerializeObject(response);
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)statusCode;
            return context.Response.WriteAsync(payload);
        }

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
                logger.Debug($"Request: {context.Request.Path}");
                await next(context);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex);
            }
        }
    }
}