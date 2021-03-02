using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;
using Wordki.Api.Domain2;
using Wordki.Api.Services;
using Wordki.Infrastructure.Framework.ExceptionMiddleware;

namespace Wordki.Api.Featuers.User.Register
{
    public class RegisterCommandHandler : IRequestHandler<RegisterCommand>
    {
        private readonly WordkiDbContext2 dbContext;
        private readonly IEncrypter encrypter;
        private readonly IUserCreator userCreator;

        public RegisterCommandHandler(WordkiDbContext2 dbContext, IEncrypter encrypter, IUserCreator userCreator)
        {
            this.dbContext = dbContext;
            this.encrypter = encrypter;
            this.userCreator = userCreator;
        }

        public async Task<Unit> Handle(RegisterCommand request, CancellationToken cancellationToken)
        {
            var hashedPassword = encrypter.Md5Hash(request.Password);
            if (await dbContext.Users.AnyAsync(u => u.Name.Equals(request.UserName) && u.Password.Equals(hashedPassword)))
            {
                throw new ApiException("User already exists", ErrorCode.RegisterUserAlreadyExists);
            }
            var newUser = userCreator.Create(request.UserName, hashedPassword);
            await dbContext.Users.AddAsync(newUser);
            await dbContext.SaveChangesAsync();
            return Unit.Value;
        }

    }
}
