using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Wordki.Api.Repositories.EntityFrameworkRepositories;
using Wordki.Api.Responses;
using Wordki.Utils.HttpContext;

namespace Wordki.Api.Featuers.Card.GetLastFailed
{
    public class GetLastFailedQueryHandler : IRequestHandler<GetLastFailedQuery, ExtendedCardDetailsDto>
    {
        private readonly WordkiDbContext dbContext;
        private readonly IHttpContextProvider httpContextProvider;

        public GetLastFailedQueryHandler(WordkiDbContext dbContext, IHttpContextProvider httpContextProvider)
        {
            this.dbContext = dbContext;
            this.httpContextProvider = httpContextProvider;
        }
        public async Task<ExtendedCardDetailsDto> Handle(GetLastFailedQuery request, CancellationToken cancellationToken)
        {
            var userId = httpContextProvider.GetUserId();
            var result = await dbContext.Repeats
            .Include(r => r.Word).ThenInclude(c => c.Group)
            .Where(r => r.Lesson.User.Id == userId && r.Result < 0)
            .OrderByDescending(r => r.DateTime)
            .Take(1)
            .FirstOrDefaultAsync();

            var card = result?.Word;
            return card != null ? card.GetExtendedCardDetailsDto() : null;
        }
    }
}
