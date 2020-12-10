using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;
using Wordki.Api.Repositories.EntityFrameworkRepositories;
using Wordki.Api.Services;
using Wordki.Infrastructure.Framework.ExceptionMiddleware;
using Wordki.Utils.TimeProvider;

namespace Wordki.Api.Featuers.User.Login
{
    public class LoginCommandHandler : IRequestHandler<LoginCommnad, string>
    {
        private readonly WordkiDbContext dbContext;
        private readonly IEncrypter encrypter;
        private readonly ITimeProvider dateTimeProvider;
        private readonly IAuthenticationService authenticationService;

        public LoginCommandHandler(WordkiDbContext dbContext,
            IEncrypter encrypter,
            ITimeProvider dateTimeProvider,
            IAuthenticationService authenticationService)
        {
            this.dbContext = dbContext;
            this.encrypter = encrypter;
            this.dateTimeProvider = dateTimeProvider;
            this.authenticationService = authenticationService;
        }

        public async Task<string> Handle(LoginCommnad request, CancellationToken cancellationToken)
        {
            var hashedPassword = encrypter.Md5Hash(request.Password);
            var user = await dbContext.Users.SingleOrDefaultAsync(u =>
                u.Name.Equals(request.UserName) &&
                u.Password.Equals(hashedPassword));

            if (user == null)
            {
                throw new ApiException("User is not found", ErrorCode.LoginUserNotFound);
            }
            user.LastLoginDate = dateTimeProvider.GetTime();

            dbContext.Users.Update(user);
            await dbContext.SaveChangesAsync();
            return authenticationService.Authenticate(user.Id, new string[0]);
        }
    }
}
