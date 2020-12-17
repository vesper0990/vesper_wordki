using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Wordki.Api.Repositories.EntityFrameworkRepositories;
using Wordki.Api.Responses;

namespace Wordki.Api.Featuers.Card.GetCardDetails
{
    public class GetCardDetailsQueryHandler : IRequestHandler<GetCardDetailsQuery, IEnumerable<CardDetailsDto>>
    {
        private readonly WordkiDbContext dbContext;

        public GetCardDetailsQueryHandler(WordkiDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<IEnumerable<CardDetailsDto>> Handle(GetCardDetailsQuery request, CancellationToken cancellationToken)
        {
            var cards = dbContext.Words
                .Include(c => c.Group)
                .Include(c => c.Repeats)
                .Where(c => c.Id == request.CardId);

            return await Task.FromResult(cards.Select(c => c.GetCardDetailsDto()));
        }
    }
}
