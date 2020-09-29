using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;
using Wordki.Api.Repositories.EntityFrameworkRepositories;

namespace Wordki.Api.Featuers.Group.Delete
{
    public class DeleteGroupCommandHandler : IRequestHandler<DeleteGroupCommand>
    {
        private readonly WordkiDbContext dbContext;

        public DeleteGroupCommandHandler(WordkiDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<Unit> Handle(DeleteGroupCommand request, CancellationToken cancellationToken)
        {
            ValidateRequest(request);
            var group = await dbContext.Groups.SingleOrDefaultAsync(g => g.Id == request.GroupId);
            if(group == null)
            {
                throw new Exception();
            }
            dbContext.Groups.Remove(group);
            await dbContext.SaveChangesAsync();
            return Unit.Value;
        }

        private void ValidateRequest(DeleteGroupCommand request)
        {
            if(request.GroupId == 0)
            {
                throw new Exception();
            }
        }
    }
}
