using FluentValidation;

namespace Wordki.Api.Featuers.Card.Add
{
    public class AddCardValidator : AbstractValidator<AddCardCommand>
    {
        public AddCardValidator()
        {
            RuleFor(r => r.GroupId).Must(v => v > 0).WithMessage($"{nameof(AddCardCommand.GroupId)} must be greater then 0");
            RuleFor(r => r.Heads).NotNull().WithMessage($"{nameof(AddCardCommand.Heads)} cannot be null");
            RuleFor(r => r.Tails).NotNull().WithMessage($"{nameof(AddCardCommand.Tails)} cannot be null");
        }
    }
}
