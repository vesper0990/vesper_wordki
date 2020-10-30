using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Wordki.Api.Repositories.EntityFrameworkRepositories;

namespace Wordki.Api.Featuers.Card.GetCardDetails
{
    public class GetCardDetailsQueryHandler : IRequestHandler<GetCardDetailsQuery, IEnumerable<GetCardDetailsDto>>
    {
        private readonly WordkiDbContext dbContext;

        public GetCardDetailsQueryHandler(WordkiDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<IEnumerable<GetCardDetailsDto>> Handle(GetCardDetailsQuery request, CancellationToken cancellationToken)
        {
            var cards = dbContext.Words
                .Include(c => c.Group)
                .Include(c => c.Repeats)
                .Where(c => c.Id == request.CardId);

            return await Task.FromResult(cards.Select(c => Map(c)));
        }

        public static GetCardDetailsDto Map(Domain.Card card) =>
            new GetCardDetailsDto
            {
                Id = card.Id,
                GroupId = card.Group.Id,
                Language1 = card.Group.GroupLanguage1,
                Language2 = card.Group.GroupLanguage2,
                Word1 = card.Heads,
                Word2 = card.Tails,
                Comment = card.Comment,
                RepeatsCount = card.Repeats.Count()
            };
    }
}
