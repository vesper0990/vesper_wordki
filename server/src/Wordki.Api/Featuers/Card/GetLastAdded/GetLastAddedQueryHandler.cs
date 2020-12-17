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
            var lastAdded = dbContext.Words
                .Include(w => w.Group).ThenInclude(g => g.User)
                .Where(w => w.Group.User.Id == userId)
                .OrderByDescending(w => w.WordCreationDate)
                .Take(request.Count)
                .Select(card => card.GetExtendedCardDetailsDto())
                .AsNoTracking();
            return await Task.FromResult(lastAdded);
        }
    }
}
