using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Wordki.Api.Domain2;
using Wordki.Api.Repositories.EntityFrameworkRepositories;
using Wordki.Api.Responses;
using Wordki.Utils.HttpContext;

namespace Wordki.Api.Featuers.Card.GetAll
{
    public class GetAllQuery : IRequest<IEnumerable<CardDetailsDto>>
    {
        public long GroupId { get; set; }
    }

    public class GetAllQueryHandler : IRequestHandler<GetAllQuery, IEnumerable<CardDetailsDto>>
    {
        private readonly WordkiDbContext2 dbContext;
        private readonly IHttpContextProvider contextProvider;

        public GetAllQueryHandler(WordkiDbContext2 dbContext, IHttpContextProvider contextProvider)
        {
            this.dbContext = dbContext;
            this.contextProvider = contextProvider;
        }

        public async Task<IEnumerable<CardDetailsDto>> Handle(GetAllQuery request, CancellationToken cancellationToken)
        {
            var userId = contextProvider.GetUserId();

            var group = await dbContext.Groups
            .Include(g => g.Cards)
            .ThenInclude(c => c.CardDetails)
            .ThenInclude(d => d.Repeats)
            .SingleOrDefaultAsync(g => g.Id == request.GroupId && g.Owner.Id == userId);

            var cards = group.Cards.Select(c => c.GetCardDetailsDto());

            return cards;
        }
    }
}