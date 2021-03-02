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
                IsVisible = card.Front.State.IsVisible,
                Language = card.Group.FrontLanguage,
                NextRepeat = card.Front.State.NextRepeat,
                RepeatCount = card.Repeats.Count(r => r.QuestionSide == QuestionSideEnum.Front)
            },
            Back = new SideDetailsDto
            {
                Value = card.Back.Value,
                Example = card.Back.Example,
                Drawer = card.Back.State.Drawer.Value,
                IsVisible = card.Back.State.IsVisible,
                Language = card.Group.BackLanguage,
                NextRepeat = card.Back.State.NextRepeat,
                RepeatCount = card.Repeats.Count(r => r.QuestionSide == QuestionSideEnum.Back)
            }
        };

        public static CardDetailsDto GetCardDetailsDto(this Domain2.Card card)
        => new CardDetailsDto
        {
            Id = card.Id,
            Front = new SideDetailsDto
            {
                Value = card.FrontValue,
                Example = card.FrontExample,
                Drawer = card.FrontDetails?.Drawer,
                IsVisible = card.FrontDetails != null,
                NextRepeat = card.FrontDetails?.NextRepeatDate,
                RepeatCount = card.FrontDetails?.Repeats.Count()
            },
            Back = new SideDetailsDto
            {
                Value = card.BackValue,
                Example = card.BackExample,
                Drawer = card.BackDetails?.Drawer,
                IsVisible = card.BackDetails != null,
                NextRepeat = card.BackDetails?.NextRepeatDate,
                RepeatCount = card.BackDetails?.Repeats.Count()
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
                IsVisible = card.Front.State.IsVisible,
                Language = card.Group.FrontLanguage,
                NextRepeat = card.Front.State.NextRepeat,
                RepeatCount = card.Repeats.Count(r => r.QuestionSide == QuestionSideEnum.Front)
            },
            Back = new SideDetailsDto
            {
                Value = card.Back.Value,
                Example = card.Back.Example,
                Drawer = card.Back.State.Drawer.Value,
                IsVisible = card.Back.State.IsVisible,
                Language = card.Group.BackLanguage,
                NextRepeat = card.Back.State.NextRepeat,
                RepeatCount = card.Repeats.Count(r => r.QuestionSide == QuestionSideEnum.Back)
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

        public static GroupDto GetGroupDto(this Domain2.Group group)
        => new GroupDto
        {
            Id = group.Id,
            Name = group.Name,
            LanguageFront = group.FrontLanguage,
            LanguageBack = group.BackLanguage,
            CardsCount = group.CardsCount,
            RepeatsCount = group.RepeatsCount
        };
    }
}