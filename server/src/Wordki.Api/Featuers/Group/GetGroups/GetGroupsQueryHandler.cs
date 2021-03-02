using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Wordki.Api.Domain2;
using Wordki.Api.Responses;
using Wordki.Utils.HttpContext;

namespace Wordki.Api.Featuers.Group.GetGroups
{
    public class GetGroupsQueryHandler : IRequestHandler<GetGroupsQuery, IEnumerable<GroupDto>>
    {
        private readonly WordkiDbContext2 dbContext;
        private readonly IHttpContextProvider httpContextProvider;

        public GetGroupsQueryHandler(WordkiDbContext2 dbContext, IHttpContextProvider httpContextProvider)
        {
            this.dbContext = dbContext;
            this.httpContextProvider = httpContextProvider;
        }

        public async Task<IEnumerable<GroupDto>> Handle(GetGroupsQuery request, CancellationToken cancellationToken)
        {
            var userId = httpContextProvider.GetUserId();
            var groups = dbContext.Groups
                .Include(g => g.Cards)
                .ThenInclude(c => c.CardDetails)
                .ThenInclude(d => d.Repeats)
                .Where(g => g.Owner.Id == userId)
                .Select(g => g.GetGroupDto());
            return await Task.FromResult(groups);
        }
    }
}
