using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Wordki.Api.Repositories.EntityFrameworkRepositories;
using Wordki.Utils.HttpContext;
using Wordki.Utils.TimeProvider;

namespace Wordki.Api.Featuers.Lesson.GetTodayCards
{
    public class GetTodayCardsQueryHandler : IRequestHandler<GetTodayCardsQuery, IEnumerable<TodayCardDto>>
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

        public async Task<IEnumerable<TodayCardDto>> Handle(GetTodayCardsQuery request, CancellationToken cancellationToken)
        {
            var userId = contextProvider.GetUserId();
            var date = timeProvider.GetDate().AddDays(1);

            var cards = dbContext.Words
                .Include(c => c.Group).ThenInclude(g => g.User)
                .Where(c =>
                    c.Group.User.Id == userId &&
                    (c.Tails.State.NextRepeat <= date || c.Heads.State.NextRepeat <= date) &&
                    c.IsVisible)
                .Select(c => Map(c));

            return await Task.FromResult(cards);
        }

        private TodayCardDto Map(Domain.Card card) =>
            new TodayCardDto
            {
                CardId = card.Id,
                GroupName = card.Group.Name,
                HeadsLanguage = card.Group.GroupLanguage1,
                TailsLanguage = card.Group.GroupLanguage2,
                Heads = card.Heads,
                Tails = card.Tails
            };
    }
}
