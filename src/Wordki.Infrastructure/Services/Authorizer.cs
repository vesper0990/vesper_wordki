using Microsoft.AspNetCore.Http;
using System;
using System.Threading.Tasks;
using Wordki.Infrastructure.DTO;

namespace Wordki.Infrastructure.Services
{
    public class Authorizer : IAuthorizer
    {
        private static readonly string userIdKey = "userId";
        private static readonly string passwordKey = "password";
        private readonly IUserService userService;

        public Authorizer(IUserService userService)
        {
            this.userService = userService;
        }

        public async Task<long> AuthorizeAsync(HttpRequest request)
        {
            if (!request.Headers.ContainsKey(userIdKey))
            {
                throw new ApiException("UserId cannot find", ErrorCode.AuthenticaitonException);
            }
            if (!request.Headers.ContainsKey(passwordKey))
            {
                throw new ApiException("Password cannot find", ErrorCode.AuthenticaitonException);
            }
            long userId = Convert.ToInt64(request.Headers[userIdKey]);
            if (!await userService.CheckUserExistingAsync(userId, request.Headers[passwordKey]))
            {
                throw new ApiException("User not find", ErrorCode.AuthenticaitonException);
            }
            return userId;

        }
    }
}
