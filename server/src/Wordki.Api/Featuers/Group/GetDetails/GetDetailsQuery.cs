using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Wordki.Api.Repositories.EntityFrameworkRepositories;
using Wordki.Api.Responses;
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
                Id = group.Id,
                LanguageFront = group.GroupLanguage1,
                LanguageBack = group.GroupLanguage2,
                Name = group.Name,
                CreationDate = group.GroupCreationDate,
                CardsCount = group.Words.Count,
                RepeatsCount = group.Words.Select(c => c.Repeats.Count).Sum()
            };
        }
    }
}