using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Wordki.Api.Domain2;
using Wordki.Utils.HttpContext;

namespace Wordki.Api.Featuers.Group.AddExisting
{
    public class AddExistingHandler : IRequestHandler<AddExistingCommand, long>
    {
        private readonly WordkiDbContext2 dbContext;
        private readonly IHttpContextProvider httpContextProvider;
        private readonly IGroupFactory groupFactory;

        public AddExistingHandler(WordkiDbContext2 dbContext,
            IHttpContextProvider httpContextProvider,
            IGroupFactory groupFactory)
        {
            this.dbContext = dbContext;
            this.httpContextProvider = httpContextProvider;
            this.groupFactory = groupFactory;
        }

        public async Task<long> Handle(AddExistingCommand request, CancellationToken cancellationToken)
        {
            var userId = httpContextProvider.GetUserId();
            var groupToAdd = await dbContext.Groups
            .Include(g => g.Cards)
            .SingleOrDefaultAsync(g => g.Id == request.GroupId, cancellationToken);

            if (groupToAdd == null)
            {
                throw new System.Exception();
            }

            var user = await dbContext.Users.SingleAsync(u => u.Id == userId);

            var newGroup = groupFactory.Clone(groupToAdd);

            await dbContext.Groups.AddAsync(newGroup);
            await dbContext.SaveChangesAsync();
            return newGroup.Id;
        }
    }
}