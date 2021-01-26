using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Wordki.Api.Repositories.EntityFrameworkRepositories;
using Wordki.Api.Responses;
using Wordki.Utils.HttpContext;

namespace Wordki.Api.Featuers.Card.GetLastAdded
{
    public class GetLastAddedQueryHandler : IRequestHandler<GetLastAddedQuery, IEnumerable<ExtendedCardDetailsDto>>
    {
        private readonly WordkiDbContext dbContext;
        private readonly IHttpContextProvider httpContextProvider;

        public GetLastAddedQueryHandler(WordkiDbContext dbContext, IHttpContextProvider httpContextProvider)
        {
            this.dbContext = dbContext;
            this.httpContextProvider = httpContextProvider;
        }

        public async Task<IEnumerable<ExtendedCardDetailsDto>> Handle(GetLastAddedQuery request, CancellationToken cancellationToken)
        {
            var userId = httpContextProvider.GetUserId();
            var lastAdded = dbContext.Cards
                .Include(w => w.Group).ThenInclude(g => g.Owner)
                .Where(w => w.Group.Owner.Id == userId)
                .OrderByDescending(w => w.CreationDate)
                .Take(request.Count)
                .Select(card => card.GetExtendedCardDetailsDto())
                .AsNoTracking();
            return await Task.FromResult(lastAdded);
        }
    }
}
