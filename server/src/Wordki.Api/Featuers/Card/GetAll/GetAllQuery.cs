using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Wordki.Api.Domain;
using Wordki.Api.Repositories.EntityFrameworkRepositories;
using Wordki.Utils.HttpContext;

namespace Wordki.Api.Featuers.Card.GetAll
{
    public class GetAllQuery : IRequest<IEnumerable<CardDto>>
    {
        public long GroupId { get; set; }
    }

    public class GetAllQueryHandler : IRequestHandler<GetAllQuery, IEnumerable<CardDto>>
    {
        private readonly WordkiDbContext dbContext;
        private readonly IHttpContextProvider contextProvider;

        public GetAllQueryHandler(WordkiDbContext dbContext, IHttpContextProvider contextProvider)
        {
            this.dbContext = dbContext;
            this.contextProvider = contextProvider;
        }

        public Task<IEnumerable<CardDto>> Handle(GetAllQuery request, CancellationToken cancellationToken)
        {
            var userId = contextProvider.GetUserId();
            var cards = dbContext.Words.Include(c => c.Group)
                .Where(c => c.Group.Id == request.GroupId && c.Group.User.Id == userId)
                .AsEnumerable().ToList();

            return Task.FromResult(cards.Select(c => Map(c)));
        }

        public CardDto Map(Api.Domain.Card card){
            return new CardDto
            {
                Id = card.Id,
                Comment = card.Comment,
                Word1 = card.Heads,
                Word2 = card.Tails
            };
        }
    }

    public class CardDto
    {
        public long Id { get; set; }
        public Side Word1 { get; set; }
        public Side Word2 { get; set; }
        public string Comment { get; set; }
        public int RepeatsCount { get; set; }
    }
}