using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Wordki.Api.Repositories.EntityFrameworkRepositories;
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
                .Include(g => g.Words)
                .Include(g => g.User)
                .Where(g => g.User.Id == userId)
                .Select(g => Map(g));
            return await Task.FromResult(groups);
        }

        public static GroupDto Map(Domain.Group group)
            => new GroupDto
            {
                Id = group.Id,
                Name = group.Name,
                Language1 = group.GroupLanguage1,
                Language2 = group.GroupLanguage2,
                CardsCount = group.Words.Count
            };
    }
}
