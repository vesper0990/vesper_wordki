using System.Threading.Tasks;
using Wordki.Infrastructure.DTO;

namespace Wordki.Infrastructure.Services
{
    public class AuthenticatorApiKey : IAuthenticator<string>
    {

        private readonly IUserService userService;

        public AuthenticatorApiKey(IUserService userService)
        {
            this.userService = userService;
        }

        public async Task<long> Authenticate(string obj)
        {
            if (string.IsNullOrEmpty(obj))
            {
                throw new ApiException("ApiKey is empty", ErrorCode.AuthenticaitonException);
            }
            UserDTO user = await userService.GetUserByApiKey(obj);
            if (user == null)
            {
                throw new ApiException("User not find", ErrorCode.AuthenticaitonException);
            }
            return user.Id;
        }
    }
}
