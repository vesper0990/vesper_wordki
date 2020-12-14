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

            var heads = dbContext.Words.Include(c => c.Group)
            .Where(c => c.Group.User.Id == userId && c.Heads.State.NextRepeat < timeProvider.GetDate());

            results.AddRange(heads.Select(item => ConvertIntoRepeatDto(item, false)));

            var tails = dbContext.Words.Include(c => c.Group)
            .Where(c => c.Group.User.Id == userId && c.Tails.State.NextRepeat < timeProvider.GetDate());

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
                Value = card.Heads.Value,
                Example = card.Heads.Example,
                Drawer = card.Heads.State.Drawer.Value,
                Language =  card.Group.GroupLanguage1
            },
            Question = new SideRepeatDto
            {
                Value = card.Tails.Value,
                Example = card.Tails.Example,
                Drawer = card.Tails.State.Drawer.Value,
                Language =  card.Group.GroupLanguage2
            }
        }
        : new CardRepeatDto
        {
            Id = card.Id,
            Question = new SideRepeatDto
            {
                Value = card.Heads.Value,
                Example = card.Heads.Example,
                Drawer = card.Heads.State.Drawer.Value,
                Language =  card.Group.GroupLanguage1
            },
            Answer = new SideRepeatDto
            {
                Value = card.Tails.Value,
                Example = card.Tails.Example,
                Drawer = card.Tails.State.Drawer.Value,
                Language =  card.Group.GroupLanguage2
            }
        };
    }
}
