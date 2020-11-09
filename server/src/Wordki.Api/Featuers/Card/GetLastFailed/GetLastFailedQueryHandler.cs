using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Threading;
using System.Threading.Tasks;
using Wordki.Api.Repositories.EntityFrameworkRepositories;
using Wordki.Utils.HttpContext;

namespace Wordki.Api.Featuers.Card.GetLastFailed
{
    public class GetLastFailedQueryHandler : IRequestHandler<GetLastFailedQuery, LastFailedDto>
    {
        private readonly WordkiDbContext dbContext;
        private readonly IHttpContextProvider httpContextProvider;

        public GetLastFailedQueryHandler(WordkiDbContext dbContext, IHttpContextProvider httpContextProvider)
        {
            this.dbContext = dbContext;
            this.httpContextProvider = httpContextProvider;
        }
        public async Task<LastFailedDto> Handle(GetLastFailedQuery request, CancellationToken cancellationToken)
        {
            var userId = httpContextProvider.GetUserId();
            var result = await dbContext.Words
                .Include(w => w.Group)
                .ThenInclude(g => g.User)
                .Include(w => w.Repeats)
                .Where(w => w.Group.User.Id == userId)
                .SelectMany(w => w.Repeats)
                .OrderByDescending(r => r.DateTime)
                .Take(1)
                .FirstOrDefaultAsync();
            var card = result.Word;
            return new LastFailedDto
            {
                GroupName = card.Group.Name,
                Language1 = card.Group.GroupLanguage1,
                Language2 = card.Group.GroupLanguage2,
                Heads = card.Heads,
                Tails = card.Tails
            };
        }
    }
}
