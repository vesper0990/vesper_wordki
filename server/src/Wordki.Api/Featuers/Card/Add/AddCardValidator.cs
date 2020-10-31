using FluentValidation;

namespace Wordki.Api.Featuers.Card.Add
{
    public class AddCardValidator : AbstractValidator<AddCardCommand>
    {
        public AddCardValidator()
        {
            RuleFor(r => r.GroupId).Must(v => v > 0).WithMessage($"{nameof(AddCardCommand.GroupId)} must be greater then 0");
            RuleFor(r => r.CardSide1).NotNull().WithMessage($"{nameof(AddCardCommand.CardSide1)} cannot be null");
            RuleFor(r => r.CardSide2).NotNull().WithMessage($"{nameof(AddCardCommand.CardSide2)} cannot be null");
        }
    }
}
