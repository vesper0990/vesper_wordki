using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Wordki.Api.Repositories.EntityFrameworkRepositories;
using Wordki.Api.Responses;
using Wordki.Utils.HttpContext;
using Wordki.Utils.TimeProvider;

namespace Wordki.Api.Featuers.Lesson.GetTodayCards
{
    public class GetTodayCardsQueryHandler : IRequestHandler<GetTodayCardsQuery, IEnumerable<CardRepeatDto>>
    {
        private readonly WordkiDbContext dbContext;
        private readonly IHttpContextProvider contextProvider;
        private readonly ITimeProvider timeProvider;

        public GetTodayCardsQueryHandler(
            WordkiDbContext dbContext,
            IHttpContextProvider contextProvider,
            ITimeProvider timeProvider)
        {
            this.dbContext = dbContext;
            this.contextProvider = contextProvider;
            this.timeProvider = timeProvider;
        }

        public Task<IEnumerable<CardRepeatDto>> Handle(GetTodayCardsQuery request, CancellationToken cancellationToken)
        {
            var userId = contextProvider.GetUserId();
            var results = new List<CardRepeatDto>();

            var heads = dbContext.Cards.Include(c => c.Group)
            .Where(c => c.Group.Owner.Id == userId && c.Front.State.NextRepeat < timeProvider.GetDate());

            results.AddRange(heads.Select(item => ConvertIntoRepeatDto(item, false)));

            var tails = dbContext.Cards.Include(c => c.Group)
            .Where(c => c.Group.Owner.Id == userId && c.Back.State.NextRepeat < timeProvider.GetDate());

            results.AddRange(tails.Select(item => ConvertIntoRepeatDto(item, true)));

            return Task.FromResult(results.AsEnumerable());
        }

        private bool CheckDate(Domain.Side side)
        {
            var sideDate = new DateTime(side.State.NextRepeat.Year, side.State.NextRepeat.Month, side.State.NextRepeat.Day);
            return sideDate.CompareTo(timeProvider.GetDate()) <= 0;
        }

        public CardRepeatDto ConvertIntoRepeatDto(Domain.Card card, bool revert = false)
        => revert
        ? new CardRepeatDto
        {
            Id = card.Id,
            Answer = new SideRepeatDto
            {
                Value = card.Front.Value,
                Example = card.Front.Example,
                Drawer = card.Front.State.Drawer.Value,
                Language = card.Group.FrontLanguage
            },
            Question = new SideRepeatDto
            {
                Value = card.Back.Value,
                Example = card.Back.Example,
                Drawer = card.Back.State.Drawer.Value,
                Language = card.Group.BackLanguage
            }
        }
        : new CardRepeatDto
        {
            Id = card.Id,
            Question = new SideRepeatDto
            {
                Value = card.Front.Value,
                Example = card.Front.Example,
                Drawer = card.Front.State.Drawer.Value,
                Language = card.Group.FrontLanguage
            },
            Answer = new SideRepeatDto
            {
                Value = card.Back.Value,
                Example = card.Back.Example,
                Drawer = card.Back.State.Drawer.Value,
                Language = card.Group.BackLanguage
            }
        };
    }
}
