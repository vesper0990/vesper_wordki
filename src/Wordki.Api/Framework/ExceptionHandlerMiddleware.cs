using System;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using NLog;
using Wordki.Infrastructure;
using Wordki.Infrastructure.DTO;

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
            logger.Error(exception, $"Message: {exception.Message} | StackTrace: {exception.StackTrace}");
            switch (exception)
            {
                case ApiException e when exceptionType == typeof(ApiException):
                    statusCode = HttpStatusCode.BadGateway;
                    errorCode = e.Code;
                    break;
                case Exception e when exceptionType == typeof(Exception):
                    statusCode = HttpStatusCode.InternalServerError;
                    break;                
            }
            var response = new ExceptionMessage { Code = errorCode, Message = CollectExceptionsInformation(exception) };
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)statusCode;
            return context.Response.WriteAsync(response.ToString());
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