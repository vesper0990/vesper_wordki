using System;
using System.Threading.Tasks;
using Wordki.Core.Data;
using Wordki.Infrastructure.Services;
using Wordki.Utils.Commands;

namespace Wordki.Commands.Login
{
    public class LoginCommandHandler : ICommandHandler<LoginCommand>
    {
        private readonly IEncrypter encrypter;
        private readonly IUserRepository userRepository;

        public LoginCommandHandler(IEncrypter encrypter, IUserRepository userRepository)
        {
            this.encrypter = encrypter;
            this.userRepository = userRepository;
        }

        public async Task HandleAsync(LoginCommand command)
        {
            var passwordHash = encrypter.Md5Hash(command.Password);
            var user = await userRepository.GetUserAsync(command.UserName, passwordHash);
            if(user == null)
            {
                throw new Exception();
            }
            user.Login();
            await userRepository.SaveAsync(user);
        }
    }
}
