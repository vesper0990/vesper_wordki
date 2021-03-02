using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;
using Wordki.Api.Domain2;
using Wordki.Utils.HttpContext;

namespace Wordki.Api.Featuers.Group.Update
{
    public class UpdateGroupCommandHandler : IRequestHandler<UpdateGroupCommand>
    {
        private readonly WordkiDbContext2 dbContext;
        private readonly IHttpContextProvider contextProvider;

        public UpdateGroupCommandHandler(WordkiDbContext2 dbContext,
        IHttpContextProvider contextProvider)
        {
            this.dbContext = dbContext;
            this.contextProvider = contextProvider;
        }

        public async Task<Unit> Handle(UpdateGroupCommand request, CancellationToken cancellationToken)
        {
            var userId = contextProvider.GetUserId();
            var group = await dbContext.Groups.SingleOrDefaultAsync(g =>
                g.Id == request.Id &&
                g.Owner.Id == userId);

            group.Name = request.Name;
            group.FrontLanguage = request.LanguageFront;
            group.BackLanguage = request.LanguageBack;

            dbContext.Groups.Update(group);
            await dbContext.SaveChangesAsync();

            return Unit.Value;
        }
    }
}
