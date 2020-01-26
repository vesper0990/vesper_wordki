using Microsoft.AspNetCore.Http;
using System.Linq;

namespace Wordki.Utils.HttpContext
{
    public interface IHttpContextProvider
    {
        long GetUserId();
    }

    public class HttpContextProvider : IHttpContextProvider
    {
        private readonly IHttpContextAccessor httpContextAccessor;

        public HttpContextProvider(IHttpContextAccessor httpContextAccessor)
        {
            this.httpContextAccessor = httpContextAccessor;
        }

        public long GetUserId()
        {
            return long.Parse(httpContextAccessor.HttpContext.User.Claims.Single(x => x.Type.Equals("Id")).Value);
        }
    }
}
