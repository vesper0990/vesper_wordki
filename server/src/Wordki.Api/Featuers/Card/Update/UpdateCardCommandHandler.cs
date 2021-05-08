using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;
using Wordki.Api.Domain2;
using Wordki.Utils.HttpContext;

namespace Wordki.Api.Featuers.Card.Update
{
    public class UpdateCardCommandHandler : IRequestHandler<UpdateCardCommand>
    {
        private readonly WordkiDbContext2 dbContext;
        private readonly IHttpContextProvider httpContextProvider;

        public UpdateCardCommandHandler(WordkiDbContext2 dbContext,
         IHttpContextProvider httpContextProvider)
        {
            this.dbContext = dbContext;
            this.httpContextProvider = httpContextProvider;
        }

        public async Task<Unit> Handle(UpdateCardCommand request, CancellationToken cancellationToken)
        {
            var userId = httpContextProvider.GetUserId();

            var card = await dbContext.Cards
            .SingleOrDefaultAsync(c => c.Id == request.Id);

            card.FrontValue = request.Front.Value;
            card.FrontExample = request.Front.Example;
            card.BackValue = request.Back.Value;
            card.BackExample = request.Back.Example;

            dbContext.Cards.Update(card);

            await dbContext.SaveChangesAsync();

            return Unit.Value;
        }

    }
}
