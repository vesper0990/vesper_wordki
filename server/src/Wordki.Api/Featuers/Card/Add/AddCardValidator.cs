using FluentValidation;

namespace Wordki.Api.Featuers.Card.Add
{
    public class AddCardValidator : AbstractValidator<AddCardCommand>
    {
        public AddCardValidator()
        {
            RuleFor(r => r.GroupId).Must(v => v > 0).WithMessage($"{nameof(AddCardCommand.GroupId)} must be greater then 0");
            RuleFor(r => r.Front).NotNull().WithMessage($"{nameof(AddCardCommand.Front)} cannot be null");
            RuleFor(r => r.Back).NotNull().WithMessage($"{nameof(AddCardCommand.Back)} cannot be null");
        }
    }
}
