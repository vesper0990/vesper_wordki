using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Wordki.Api.Domain2;
using Wordki.Api.Repositories.EntityFrameworkRepositories;

namespace Wordki.Api.Featuers.Card.Delete
{
    public class DeleteCardCommandHandler : IRequestHandler<DeleteCardComamnd>
    {
        private readonly WordkiDbContext2 dbContext;

        public DeleteCardCommandHandler(WordkiDbContext2 dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<Unit> Handle(DeleteCardComamnd request, CancellationToken cancellationToken)
        {
            var group = await dbContext.Groups
            .Include(g => g.Cards)
            .SingleOrDefaultAsync(c => c.Id == request.GroupId);

            if (group == null) throw new Exception();
            if (!group.Cards.Any(c => c.Id == request.Id)) throw new Exception();


            var card = group.RemoveCard(request.Id);

            dbContext.Cards.Remove(card);
            await dbContext.SaveChangesAsync();
            return Unit.Value;
        }
    }
}