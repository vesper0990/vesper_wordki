using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
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
        private readonly WordkiDbContext dbContext;
        private readonly IHttpContextProvider contextProvider;

        public GetAllQueryHandler(WordkiDbContext dbContext, IHttpContextProvider contextProvider)
        {
            this.dbContext = dbContext;
            this.contextProvider = contextProvider;
        }

        public Task<IEnumerable<CardDetailsDto>> Handle(GetAllQuery request, CancellationToken cancellationToken)
        {
            var userId = contextProvider.GetUserId();
            var cards = dbContext.Cards
                .Include(c => c.Group)
                .Include(c => c.Repeats)
                .Where(c => c.Group.Id == request.GroupId && c.Group.Owner.Id == userId)
                .Select(c => c.GetCardDetailsDto())
                .AsEnumerable();

            return Task.FromResult(cards);
        }
    }
}