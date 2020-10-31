using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.ComponentModel.DataAnnotations;
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
            if (await dbContext.Users.AsNoTracking().AnyAsync(u => u.Name.Equals(request.UserName) && u.Password.Equals(hashedPassword)))
            {
                throw new InvalidOperationException("User already exists");
            }
            var newUser = userCreator.Create(request.UserName, hashedPassword);
            dbContext.Users.Add(newUser);
            await dbContext.SaveChangesAsync();
            return Unit.Value;
        }

        private void ValidateRequest(RegisterCommand register)
        {
            if (string.IsNullOrEmpty(register.Password))
            {
                throw new ArgumentException();
            }

            if (string.IsNullOrEmpty(register.PasswordRepeat))
            {
                throw new ArgumentException();
            }

            if (string.IsNullOrEmpty(register.UserName))
            {
                throw new ArgumentException();
            }

            if (!register.Password.Equals(register.PasswordRepeat))
            {
                throw new ArgumentException();
            }
        }

        public class Validator: AbstractValidator<RegisterCommand>
        {
            public Validator()
            {
                RuleFor(r => r.Password).NotEmpty().NotNull().WithMessage("Password cannot be empty").WithErrorCode("0");
                RuleFor(r => r.UserName).NotEmpty().NotNull().WithMessage("UserName cannot be null");
                RuleFor(r => r.PasswordRepeat).Equal(r => r.Password).WithMessage("Password confirmation is wrong").WithErrorCode("0");
            }
        }
    }
}
