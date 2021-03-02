using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;
using Wordki.Api.Domain2;

namespace Wordki.Api.Featuers.Group.Delete
{
    public class DeleteGroupCommandHandler : IRequestHandler<DeleteGroupCommand>
    {
        private readonly WordkiDbContext2 dbContext;

        public DeleteGroupCommandHandler(WordkiDbContext2 dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<Unit> Handle(DeleteGroupCommand request, CancellationToken cancellationToken)
        {
            var group = await dbContext.Groups
            .Include(g => g.Cards)
            .SingleOrDefaultAsync(g => g.Id == request.GroupId);

            if (group == null)
            {
                return Unit.Value;
            }

            dbContext.Groups.Remove(group);
            await dbContext.SaveChangesAsync();
            return Unit.Value;
        }
    }
}
