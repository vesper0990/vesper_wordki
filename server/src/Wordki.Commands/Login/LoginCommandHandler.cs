using System;
using System.Threading.Tasks;
using Wordki.Core;
using Wordki.Core.Data;
using Wordki.Infrastructure.Framework.ExceptionMiddleware;
using Wordki.Infrastructure.Services;
using Wordki.Utils.Commands;

namespace Wordki.Commands.Login
{
    public class LoginCommandHandler : ICommandHandler<LoginCommand>
    {
        private readonly IEncrypter encrypter;
        private readonly IUserLogin userLogin;
        private readonly IUserRepository userRepository;

        public LoginCommandHandler(IEncrypter encrypter,
            IUserLogin userLogin,
            IUserRepository userRepository)
        {
            this.encrypter = encrypter;
            this.userLogin = userLogin;
            this.userRepository = userRepository;
        }

        public async Task HandleAsync(LoginCommand command)
        {
            var passwordHash = encrypter.Md5Hash(command.Password);
            var user = await userRepository.GetUserAsync(command.UserName, passwordHash);
            if(user == User.NullObject)
            {
                throw new ApiException("User not found", ErrorCode.UserNotFound);
            }
            userLogin.Login(user);
            await userRepository.SaveAsync(user);
        }
    }
}
