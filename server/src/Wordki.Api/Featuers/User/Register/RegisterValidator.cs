using FluentValidation;

namespace Wordki.Api.Featuers.User.Register
{
    public class RegisterValidator: AbstractValidator<RegisterCommand>
        {
            public RegisterValidator()
            {
                RuleFor(r => r.Password).NotEmpty().NotNull().WithMessage($"{nameof(RegisterCommand.Password)} cannot be empty").WithErrorCode("1234");
                RuleFor(r => r.UserName).NotEmpty().NotNull().WithMessage($"{nameof(RegisterCommand.UserName)} cannot be null");
                RuleFor(r => r.PasswordConfirmation).Equal(r => r.Password).WithMessage($"{nameof(RegisterCommand.Password)} confirmation is wrong").WithErrorCode("1234");
            }
        }
}
