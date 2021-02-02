using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Wordki.Api.Repositories.EntityFrameworkRepositories;
using Wordki.Utils.HttpContext;
using Wordki.Utils.TimeProvider;
using System.Linq;
using System;
using Wordki.Api.Responses;

namespace Wordki.Api.Featuers.Card.GetAllRepeat
{
    public class GetAllRepeatQueryHandler : IRequestHandler<GetAllRepeatQuery, IEnumerable<CardRepeatDto>>
    {
        private readonly WordkiDbContext dbContext;
        private readonly ITimeProvider timeProvider;
        private readonly IHttpContextProvider contextProvider;

        public GetAllRepeatQueryHandler(WordkiDbContext dbContext, ITimeProvider timeProvider, IHttpContextProvider contextProvider)
        {
            this.dbContext = dbContext;
            this.timeProvider = timeProvider;
            this.contextProvider = contextProvider;
        }

        public Task<IEnumerable<CardRepeatDto>> Handle(GetAllRepeatQuery request, CancellationToken cancellationToken)
        {
            var userId = contextProvider.GetUserId();
            var results = new List<CardRepeatDto>();

            var heads = dbContext.Cards.Include(c => c.Group)
            .Where(c => c.Group.Owner.Id == userId && c.Front.State.IsVisible && c.Front.State.NextRepeat < timeProvider.GetDate())
            .Select(item => ConvertIntoRepeatDto(item, false)).ToList();

            results.AddRange(heads);

            var tails = dbContext.Cards.Include(c => c.Group)
            .Where(c => c.Group.Owner.Id == userId && c.Back.State.IsVisible && c.Back.State.NextRepeat < timeProvider.GetDate())
            .Select(item => ConvertIntoRepeatDto(item, true));

            results.AddRange(tails);

            var random = new Random();
            var shuffledArray = results.OrderBy(x => random.Next());

            return Task.FromResult(results.Take(request.Count));
        }

        private bool CheckDate(Domain.Side side)
        {
            var sideDate = new DateTime(side.State.NextRepeat.Year, side.State.NextRepeat.Month, side.State.NextRepeat.Day);
            return sideDate.CompareTo(timeProvider.GetDate()) <= 0;
        }

        public static CardRepeatDto ConvertIntoRepeatDto(Domain.Card card, bool revert = false)
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