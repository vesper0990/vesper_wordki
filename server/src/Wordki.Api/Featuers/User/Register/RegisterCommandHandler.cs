using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;
using Wordki.Api.Repositories.EntityFrameworkRepositories;
using Wordki.Api.Services;

namespace Wordki.Api.Featuers.User.Register
{
    public class RegisterCommandHandler : IRequestHandler<RegisterCommand>
    {
        private readonly WordkiDbContext dbContext;
        private readonly IEncrypter encrypter;
        private readonly IUserCreator userCreator;

        public RegisterCommandHandler(WordkiDbContext dbContext, IEncrypter encrypter, IUserCreator userCreator)
        {
            this.dbContext = dbContext;
            this.encrypter = encrypter;
            this.userCreator = userCreator;
        }

        public async Task<Unit> Handle(RegisterCommand request, CancellationToken cancellationToken)
        {
            ValidateRequest(request);
            var hashedPassword = encrypter.Md5Hash(request.Password);
            var newUser = userCreator.Create(request.UserName, hashedPassword);
            dbContext.Users.Add(newUser);
            await dbContext.SaveChangesAsync();
            return Unit.Value;
        }

        private void ValidateRequest(RegisterCommand register)
        {
            if (string.IsNullOrEmpty(register.Password))
            {
                throw new Exception();
            }

            if (string.IsNullOrEmpty(register.PasswordRepeat))
            {
                throw new Exception();
            }

            if (string.IsNullOrEmpty(register.UserName))
            {
                throw new Exception();
            }

            if (!register.Password.Equals(register.PasswordRepeat))
            {
                throw new Exception();
            }
        }
    }
}
