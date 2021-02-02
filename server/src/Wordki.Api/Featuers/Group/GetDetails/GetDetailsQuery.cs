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
            .Include(g => g.Cards).ThenInclude(c => c.Repeats)
            .FirstOrDefaultAsync(g => g.Id == request.GroupId && g.Owner.Id == userId);

            return new GroupDetailsDto
            {
                Id = group.Id,
                LanguageFront = group.FrontLanguage,
                LanguageBack = group.BackLanguage,
                Name = group.Name,
                CreationDate = group.CreationDate,
                CardsCount = group.Cards.Count,
                RepeatsCount = group.Cards.Select(c => c.Repeats.Count).Sum()
            };
        }
    }
}