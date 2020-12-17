using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Wordki.Api.Repositories.EntityFrameworkRepositories;
using Wordki.Api.Responses;
using Wordki.Utils.HttpContext;

namespace Wordki.Api.Featuers.Card.GetNextRepeat
{
    public class GetNextRepeatQueryHandler : IRequestHandler<GetNextRepeatQuery, ExtendedCardDetailsDto>
    {
        private readonly WordkiDbContext dbContext;
        private readonly IHttpContextProvider contextProvider;

        public GetNextRepeatQueryHandler(WordkiDbContext dbContext, IHttpContextProvider contextProvider)
        {
            this.dbContext = dbContext;
            this.contextProvider = contextProvider;
        }

        public async Task<ExtendedCardDetailsDto> Handle(GetNextRepeatQuery request, CancellationToken cancellationToken)
        {
            var userId = contextProvider.GetUserId();

            var minHeads = await dbContext.Words
                .Include(w => w.Group).ThenInclude(g => g.User)
                .Where(c => c.Group.User.Id == userId).OrderBy(w => w.Heads.State.NextRepeat).Take(1).FirstOrDefaultAsync();

            var minTails = await dbContext.Words
                .Include(w => w.Group).ThenInclude(g => g.User)
                .Where(c => c.Group.User.Id == userId).OrderBy(w => w.Tails.State.NextRepeat).Take(1).FirstOrDefaultAsync();

            var card = GetNextRepeat(minHeads, minTails);
            return card == null ? null : card.GetExtendedCardDetailsDto();
        }

        private Domain.Card GetNextRepeat(Domain.Card minHeads, Domain.Card minTails)
        {
            if (minHeads == null && minTails == null)
            {
                return null;
            }
            if (minHeads == null)
            {
                return minTails;
            }
            if (minTails == null)
            {
                return minHeads;
            }
            return minHeads.Heads.State.NextRepeat < minTails.Tails.State.NextRepeat ? minHeads : minTails;
        }
    }
}
