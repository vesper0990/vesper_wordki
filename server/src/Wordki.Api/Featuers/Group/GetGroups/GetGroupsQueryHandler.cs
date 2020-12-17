using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Wordki.Api.Repositories.EntityFrameworkRepositories;
using Wordki.Api.Responses;
using Wordki.Utils.HttpContext;

namespace Wordki.Api.Featuers.Group.GetGroups
{
    public class GetGroupsQueryHandler : IRequestHandler<GetGroupsQuery, IEnumerable<GroupDto>>
    {
        private readonly WordkiDbContext dbContext;
        private readonly IHttpContextProvider httpContextProvider;

        public GetGroupsQueryHandler(WordkiDbContext dbContext, IHttpContextProvider httpContextProvider)
        {
            this.dbContext = dbContext;
            this.httpContextProvider = httpContextProvider;
        }

        public async Task<IEnumerable<GroupDto>> Handle(GetGroupsQuery request, CancellationToken cancellationToken)
        {
            var userId = httpContextProvider.GetUserId();
            var groups = dbContext.Groups
                .Include(g => g.Words).ThenInclude(c => c.Repeats)
                .Include(g => g.User)
                .Where(g => g.User.Id == userId)
                .Select(g => g.GetGroupDto());
            return await Task.FromResult(groups);
        }
    }
}
