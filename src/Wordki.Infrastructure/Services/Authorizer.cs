using Microsoft.AspNetCore.Http;
using System;
using System.Threading.Tasks;

namespace Wordki.Infrastructure.Services
{
    public class Authorizer : IAuthorizer
    {
        private static readonly string userIdKey = "userId";
        private static readonly string passwordKey = "password";
        private readonly UserService userService;

        public Authorizer(UserService userService)
        {
            this.userService = userService;
        }

        public async Task<long> AuthorizeAsync(HttpRequest request)
        {
            if (!request.Headers.ContainsKey(userIdKey))
            {
                throw new Exception("header not contain userId");
            }
            if (!request.Headers.ContainsKey(passwordKey))
            {
                throw new Exception("header not contain password");
            }
            long userId = Convert.ToInt64(request.Headers[userIdKey]);
            if (!await userService.CheckUserExistingAsync(userId, request.Headers[passwordKey]))
            {
                throw new Exception("Invalid Credential");
            }
            return userId;

        }
    }
}
