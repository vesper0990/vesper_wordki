using System.Linq;
using Wordki.Api.Domain;

namespace Wordki.Api.Responses
{
    public static class ResponsesExtensions
    {
        public static CardDetailsDto GetCardDetailsDto(this Card card)
        => new CardDetailsDto
        {
            Id = card.Id,
            CreationDate = card.CreationDate,
            Front = new SideDetailsDto
            {
                Value = card.Front.Value,
                Example = card.Front.Example,
                Drawer = card.Front.State.Drawer.Value,
                IsVisible = card.IsVisible, // todo split is visible on front and back
                Language = card.Group.FrontLanguage,
                NextRepeat = card.Front.State.NextRepeat,
                RepeatCount = card.Repeats.Count(r => r.QuestionSide == QuestionSideEnum.Heads)
            },
            Back = new SideDetailsDto
            {
                Value = card.Back.Value,
                Example = card.Back.Example,
                Drawer = card.Back.State.Drawer.Value,
                IsVisible = card.IsVisible, // todo split is visible on front and back
                Language = card.Group.BackLanguage,
                NextRepeat = card.Back.State.NextRepeat,
                RepeatCount = card.Repeats.Count(r => r.QuestionSide == QuestionSideEnum.Tails)
            }
        };

        public static ExtendedCardDetailsDto GetExtendedCardDetailsDto(this Card card)
        => new ExtendedCardDetailsDto
        {
            Id = card.Id,
            GroupName = card.Group.Name,
            CreationDate = card.CreationDate,
            Front = new SideDetailsDto
            {
                Value = card.Front.Value,
                Example = card.Front.Example,
                Drawer = card.Front.State.Drawer.Value,
                IsVisible = card.IsVisible, // todo split is visible on front and back
                Language = card.Group.FrontLanguage,
                NextRepeat = card.Front.State.NextRepeat,
                RepeatCount = card.Repeats.Count(r => r.QuestionSide == QuestionSideEnum.Heads)
            },
            Back = new SideDetailsDto
            {
                Value = card.Back.Value,
                Example = card.Back.Example,
                Drawer = card.Back.State.Drawer.Value,
                IsVisible = card.IsVisible, // todo split is visible on front and back
                Language = card.Group.BackLanguage,
                NextRepeat = card.Back.State.NextRepeat,
                RepeatCount = card.Repeats.Count(r => r.QuestionSide == QuestionSideEnum.Tails)
            }
        };

        public static GroupDto GetGroupDto(this Group group)
         => new GroupDto
         {
             Id = group.Id,
             Name = group.Name,
             LanguageFront = group.FrontLanguage,
             LanguageBack = group.BackLanguage,
             CardsCount = group.Cards.Count,
             RepeatsCount = group.Cards.Select(c => c.Repeats.Count).Sum()
         };
    }
}