using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;
using Wordki.Api.Repositories.EntityFrameworkRepositories;
using Wordki.Utils.HttpContext;

namespace Wordki.Api.Featuers.Group.GetCount
{
    public class GetCountQueryHandler : IRequestHandler<GetCountQuery, int>
    {
        private readonly WordkiDbContext dbContext;
        private readonly IHttpContextProvider contextProvider;

        public GetCountQueryHandler(WordkiDbContext dbContext, IHttpContextProvider contextProvider)
        {
            this.dbContext = dbContext;
            this.contextProvider = contextProvider;
        }

        public async Task<int> Handle(GetCountQuery request, CancellationToken cancellationToken)
        {
            var userId = contextProvider.GetUserId();
            return await dbContext.Groups.CountAsync(g => g.User.Id == userId);
        }
    }
}
