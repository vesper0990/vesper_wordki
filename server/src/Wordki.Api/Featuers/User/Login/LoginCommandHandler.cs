using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;
using Wordki.Api.Repositories.EntityFrameworkRepositories;
using Wordki.Api.Services;

namespace Wordki.Api.Featuers.User.Login
{
    public class LoginCommandHandler : IRequestHandler<LoginCommnad, string>
    {
        private readonly WordkiDbContext dbContext;
        private readonly IEncrypter encrypter;
        private readonly IDateTimeProvider dateTimeProvider;
        private readonly IAuthenticationService authenticationService;

        public LoginCommandHandler(WordkiDbContext dbContext,
            IEncrypter encrypter,
            IDateTimeProvider dateTimeProvider,
            IAuthenticationService authenticationService)
        {
            this.dbContext = dbContext;
            this.encrypter = encrypter;
            this.dateTimeProvider = dateTimeProvider;
            this.authenticationService = authenticationService;
        }

        public async Task<string> Handle(LoginCommnad request, CancellationToken cancellationToken)
        {
            ValidateRequest(request);
            var hashedPassword = encrypter.Md5Hash(request.Password);
            var user = await dbContext.Users.SingleOrDefaultAsync(u =>
                u.Name.Equals(request.UserName) &&
                u.Password.Equals(hashedPassword));
            user.LastLoginDate = dateTimeProvider.Now();

            dbContext.Users.Update(user);
            await dbContext.SaveChangesAsync();
            return authenticationService.Authenticate(user.Id, new string[0]);
        }

        private void ValidateRequest(LoginCommnad commnad)
        {
            if (string.IsNullOrEmpty(commnad.Password))
            {
                throw new Exception();
            }

            if (string.IsNullOrEmpty(commnad.UserName))
            {
                throw new Exception();
            }
        }
    }
}
