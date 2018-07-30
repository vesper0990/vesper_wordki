using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Wordki.Infrastructure.DTO;

namespace Wordki.Infrastructure.Services
{
    public class AuthorizerApiKey : IAuthorizer
    {
        private static readonly string apiKeyKey = "apiKey";
        private readonly IUserService userService;

        public AuthorizerApiKey(IUserService userService)
        {
            this.userService = userService;
        }

        public async Task<long> AuthorizeAsync(HttpRequest request)
        {
            if (!request.Headers.ContainsKey(apiKeyKey))
            {
                throw new ApiException("ApiKey cannot find", ErrorCode.AuthenticaitonException);
            }
            UserDTO user = await userService.GetUserByApiKey(request.Headers[apiKeyKey]);
            if(user == null)
            {
                throw new ApiException("User not find", ErrorCode.AuthenticaitonException);
            }
            return user.Id;
        }
    }
}
