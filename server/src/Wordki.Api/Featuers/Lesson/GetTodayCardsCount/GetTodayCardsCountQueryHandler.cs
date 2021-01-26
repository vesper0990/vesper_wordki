using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;
using Wordki.Api.Repositories.EntityFrameworkRepositories;
using Wordki.Utils.HttpContext;
using Wordki.Utils.TimeProvider;

namespace Wordki.Api.Featuers.Lesson.GetTodayCardsCount
{
    public class GetTodayCardsCountQueryHandler : IRequestHandler<GetTodayCardsCountQuery, int>
    {
        private readonly WordkiDbContext dbContext;
        private readonly IHttpContextProvider contextProvider;
        private readonly ITimeProvider timeProvider;

        public GetTodayCardsCountQueryHandler(WordkiDbContext dbContext, IHttpContextProvider contextProvider, ITimeProvider timeProvider)
        {
            this.dbContext = dbContext;
            this.contextProvider = contextProvider;
            this.timeProvider = timeProvider;
        }

        public async Task<int> Handle(GetTodayCardsCountQuery request, CancellationToken cancellationToken)
        {
            var userId = contextProvider.GetUserId();
            var date = timeProvider.GetDate().AddDays(1);
            var count = 0;
            count += await dbContext.Cards.CountAsync(c => c.Group.Owner.Id == userId && c.Front.State.NextRepeat < timeProvider.GetDate(), cancellationToken);
            count += await dbContext.Cards.CountAsync(c => c.Group.Owner.Id == userId && c.Back.State.NextRepeat < timeProvider.GetDate(), cancellationToken);

            return count;
        }
    }
}
