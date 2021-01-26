using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;
using Wordki.Api.Repositories.EntityFrameworkRepositories;

namespace Wordki.Api.Featuers.Card.Update
{
    public class UpdateCardCommandHandler : IRequestHandler<UpdateCardCommand>
    {
        private readonly WordkiDbContext dbContext;

        public UpdateCardCommandHandler(WordkiDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<Unit> Handle(UpdateCardCommand request, CancellationToken cancellationToken)
        {
            ValidateRequest(request);
            var card = await dbContext.Cards.SingleOrDefaultAsync(c => c.Id == request.Id);
            card.Front.Value = request.Front.Value;
            card.Front.Example = request.Front.Example;
            card.Back.Value = request.Back.Value;
            card.Back.Example = request.Back.Example;
            card.IsVisible = request.IsVisible;
            dbContext.Cards.Update(card);
            await dbContext.SaveChangesAsync();
            return Unit.Value;
        }

        private void ValidateRequest(UpdateCardCommand request)
        {
            if (request.Id == 0)
            {
                throw new Exception();
            }
        }
    }
}
