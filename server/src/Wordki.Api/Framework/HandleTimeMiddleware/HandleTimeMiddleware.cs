using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace Wordki.Infrastructure.Framework.HandleTimeMiddleware
{
    public class HandleTimeMiddleware : IMiddleware
    {
        private readonly ILogger<HandleTimeMiddleware> logger;

        public HandleTimeMiddleware(ILogger<HandleTimeMiddleware> logger)
        {
            this.logger = logger;
        }

        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            var beginningTime = DateTime.Now.Ticks;
            await next(context);
            var finishTime = DateTime.Now.Ticks;
            logger.LogInformation("HandleTime {timespan}: ", finishTime - beginningTime);
        }
    }
}