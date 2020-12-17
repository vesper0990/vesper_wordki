using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;
using Wordki.Api.Repositories.EntityFrameworkRepositories;

namespace Wordki.Api.Featuers.Group.Update
{
    public class UpdateGroupCommandHandler : IRequestHandler<UpdateGroupCommand>
    {
        private readonly WordkiDbContext dbContext;

        public UpdateGroupCommandHandler(WordkiDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<Unit> Handle(UpdateGroupCommand request, CancellationToken cancellationToken)
        {
            ValidateRequest(request);
            var group = await dbContext.Groups.SingleOrDefaultAsync(g => g.Id == request.Id);
            group.Name = request.Name;
            group.GroupLanguage1 = request.LanguageFront;
            group.GroupLanguage2 = request.LanguageBack;

            dbContext.Groups.Update(group);
            await dbContext.SaveChangesAsync();

            return Unit.Value;
        }

        private void ValidateRequest(UpdateGroupCommand request)
        {
            if(request.Id == 0)
            {
                throw new Exception();
            }
        }
    }
}
