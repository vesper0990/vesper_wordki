using System.Threading.Tasks;
using Wordki.Core;
using Wordki.Core.Data;
using Wordki.Infrastructure.Framework.ExceptionMiddleware;
using Wordki.Infrastructure.Services;
using Wordki.Utils.Commands;

namespace Wordki.Commands.Register
{
    public class RegisterCommandHandler : ICommandHandler<RegisterCommand>
    {
        private readonly IUserFactory userFactory;
        private readonly IEncrypter encrypter;
        private readonly IUserRepository userReposiory;

        public RegisterCommandHandler(IUserFactory userFactory, IEncrypter encrypter, IUserRepository userReposiory)
        {
            this.userFactory = userFactory;
            this.encrypter = encrypter;
            this.userReposiory = userReposiory;
        }

        public async Task HandleAsync(RegisterCommand command)
        {
            var passwordHash = encrypter.Md5Hash(command.Password);
            var isExists = await userReposiory.IsExists(command.UserName);
            if(isExists)
            {
                throw new ApiException("User already exits", ErrorCode.UserAlreadyExists);
            }
            var user = userFactory.Create(command.UserName, passwordHash);
            await userReposiory.SaveAsync(user);
        }
    }
}
