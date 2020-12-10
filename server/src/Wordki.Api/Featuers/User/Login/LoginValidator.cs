using FluentValidation;

namespace Wordki.Api.Featuers.User.Login
{
    public class LoginValidator : AbstractValidator<LoginCommnad>
    {
        public LoginValidator()
        {
            RuleFor(x => x.Password).MinimumLength(5).WithMessage($"{nameof(LoginCommnad.Password)} is to short").WithErrorCode("2");
            RuleFor(x => x.Password).NotNull().NotEmpty().WithMessage($"{nameof(LoginCommnad.Password)} cannot be empty");
            RuleFor(x => x.UserName).NotNull().NotEmpty().WithMessage($"{nameof(LoginCommnad.UserName)} cannot be empty");
        }
    }
}
