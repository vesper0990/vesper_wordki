using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using NLog;

namespace Wordki.Infrastructure.Framework.HandleTimeMiddleware
{
    public class HandleTimeMiddleware : IMiddleware
    {
        private static readonly Logger logger = LogManager.GetCurrentClassLogger();

        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            var beginningTime = DateTime.Now;
            await next(context);
            var finishTime = DateTime.Now;
            var timeSpan = finishTime - beginningTime;
            logger.Info(context.Request.PathBase, timeSpan);
        }
    }
}