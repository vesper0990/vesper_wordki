using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Wordki.Api.Repositories.EntityFrameworkRepositories;
using Wordki.Utils.HttpContext;

namespace Wordki.Api.Featuers.Group.GetDetails
{
    public class GetDetailsQuery : IRequest<GroupDetailsDto>
    {
        public long GroupId { get; set; }
    }

    public class GetDetailsQueryHandler : IRequestHandler<GetDetailsQuery, GroupDetailsDto>
    {
        private readonly WordkiDbContext dbContext;
        private readonly IHttpContextProvider contextProvider;

        public GetDetailsQueryHandler(WordkiDbContext dbContext, IHttpContextProvider contextProvider)
        {
            this.dbContext = dbContext;
            this.contextProvider = contextProvider;
        }

        public async Task<GroupDetailsDto> Handle(GetDetailsQuery request, CancellationToken cancellationToken)
        {
            var userId = contextProvider.GetUserId();
            var group = await dbContext.Groups
            .Include(g => g.Words).ThenInclude(c => c.Repeats)
            .FirstOrDefaultAsync(g => g.Id == request.GroupId && g.User.Id == userId);

            return new GroupDetailsDto
            {
                GroupId = group.Id,
                Language1 = group.GroupLanguage1,
                Language2 = group.GroupLanguage2,
                Name = group.Name,
                CreationDate = group.GroupCreationDate,
                CardsCount = group.Words.Count,
                RepeatsCount = group.Words.Select(c => c.Repeats.Count).Sum()
            };
        }
    }

    public class GroupDetailsDto
    {
        public long GroupId { get; set; }
        public string Name { get; set; }
        public int Language1 { get; set; }
        public int Language2 { get; set; }
        public int CardsCount { get; set; }
        public int RepeatsCount { get; set; }
        public DateTime CreationDate { get; set; }
    }
}