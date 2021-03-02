using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Wordki.Api.Domain2;
using Wordki.Api.Repositories.EntityFrameworkRepositories;
using Wordki.Api.Responses;

namespace Wordki.Api.Featuers.Card.GetCardDetails
{
    public class GetCardDetailsQueryHandler : IRequestHandler<GetCardDetailsQuery, IEnumerable<CardDetailsDto>>
    {
        private readonly WordkiDbContext2 dbContext;

        public GetCardDetailsQueryHandler(WordkiDbContext2 dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<IEnumerable<CardDetailsDto>> Handle(GetCardDetailsQuery request, CancellationToken cancellationToken)
        {
            var cards = dbContext.Cards
                .Include(c => c.Group)
                .Include(c => c.CardDetails)
                .ThenInclude(d => d.Repeats)
                .Where(c => c.Id == request.CardId);

            return await Task.FromResult(cards.Select(c => c.GetCardDetailsDto()));
        }
    }
}
