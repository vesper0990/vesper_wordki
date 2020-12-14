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
            CreationDate = card.WordCreationDate,
            Front = new SideDetailsDto
            {
                Value = card.Heads.Value,
                Example = card.Heads.Example,
                Drawer = card.Heads.State.Drawer.Value,
                IsVisible = card.IsVisible, // todo split is visible on front and back
                Language = card.Group.GroupLanguage1,
                NextRepeat = card.Heads.State.NextRepeat,
                RepeatCounts = card.Repeats.Count(r => r.QuestionSide == QuestionSideEnum.Heads)
            },
            Back = new SideDetailsDto
            {
                Value = card.Tails.Value,
                Example = card.Tails.Example,
                Drawer = card.Tails.State.Drawer.Value,
                IsVisible = card.IsVisible, // todo split is visible on front and back
                Language = card.Group.GroupLanguage2,
                NextRepeat = card.Tails.State.NextRepeat,
                RepeatCounts = card.Repeats.Count(r => r.QuestionSide == QuestionSideEnum.Tails)
            }
        };

        public static ExtendedCardDetailsDto GetExtendedCardDetailsDto(this Card card)
        => new ExtendedCardDetailsDto
        {
            Id = card.Id,
            GroupName = card.Group.Name,
            CreationDate = card.WordCreationDate,
            Front = new SideDetailsDto
            {
                Value = card.Heads.Value,
                Example = card.Heads.Example,
                Drawer = card.Heads.State.Drawer.Value,
                IsVisible = card.IsVisible, // todo split is visible on front and back
                Language = card.Group.GroupLanguage1,
                NextRepeat = card.Heads.State.NextRepeat,
                RepeatCounts = card.Repeats.Count(r => r.QuestionSide == QuestionSideEnum.Heads)
            },
            Back = new SideDetailsDto
            {
                Value = card.Tails.Value,
                Example = card.Tails.Example,
                Drawer = card.Tails.State.Drawer.Value,
                IsVisible = card.IsVisible, // todo split is visible on front and back
                Language = card.Group.GroupLanguage2,
                NextRepeat = card.Tails.State.NextRepeat,
                RepeatCounts = card.Repeats.Count(r => r.QuestionSide == QuestionSideEnum.Tails)
            }
        };

        public static GroupDto GetGroupDto(this Group group)
         => new GroupDto
         {
             Id = group.Id,
             Name = group.Name,
             LanguageFront = group.GroupLanguage1,
             LanguageBack = group.GroupLanguage2,
             CardsCount = group.Words.Count,
             RepeatsCount = group.Words.Select(c => c.Repeats.Count).Sum()
         };
    }
}