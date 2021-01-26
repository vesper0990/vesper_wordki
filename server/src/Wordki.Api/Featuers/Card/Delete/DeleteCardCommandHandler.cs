using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;
using Wordki.Api.Repositories.EntityFrameworkRepositories;

namespace Wordki.Api.Featuers.Card.Delete
{
    public class DeleteCardCommandHandler : IRequestHandler<DeleteCardComamnd>
    {
        private readonly WordkiDbContext dbContext;

        public DeleteCardCommandHandler(WordkiDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<Unit> Handle(DeleteCardComamnd request, CancellationToken cancellationToken)
        {
            ValidateReqest(request);
            var card = await dbContext.Cards.SingleOrDefaultAsync(c => c.Id == request.Id);
            if (card == null)
            {
                throw new Exception();
            }
            dbContext.Cards.Remove(card);
            await dbContext.SaveChangesAsync();
            return Unit.Value;
        }

        private void ValidateReqest(DeleteCardComamnd request)
        {
            if (request.Id == 0)
            {
                throw new Exception();
            }
        }
    }
}
