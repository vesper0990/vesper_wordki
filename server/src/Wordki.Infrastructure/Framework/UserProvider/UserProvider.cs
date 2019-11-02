using Microsoft.AspNetCore.Http;
using System;
using System.Linq;
using System.Security.Claims;

namespace Wordki.Infrastructure.Framework.UserProvider
{
    public interface IUserProvider
    {
        Guid GetGuid();
    }

    public class UserProvider : IUserProvider
    {
        private readonly IHttpContextAccessor httpContextAccessor;

        public UserProvider(IHttpContextAccessor httpContextAccessor)
        {
            this.httpContextAccessor = httpContextAccessor;
        }

        public Guid GetGuid()
        {
            var guid = httpContextAccessor.HttpContext.User.Claims.Single(x => x.Type == ClaimTypes.Name).Value;
            return Guid.Parse(guid);
        }
    }
}
