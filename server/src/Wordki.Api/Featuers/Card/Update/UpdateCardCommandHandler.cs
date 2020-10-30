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
            var card = await dbContext.Words.SingleOrDefaultAsync(c => c.Id == request.Id);
            card.Heads = request.CardSide1;
            card.Tails = request.CardSide2;
            card.Comment = request.Comment;
            card.IsVisible = request.IsVisible;
            dbContext.Words.Update(card);
            await dbContext.SaveChangesAsync();
            return Unit.Value;
        }

        private void ValidateRequest(UpdateCardCommand request)
        {
            if(request.Id == 0)
            {
                throw new Exception();
            }
        }
    }
}
