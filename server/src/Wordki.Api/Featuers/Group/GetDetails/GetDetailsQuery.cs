using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Wordki.Api.Domain2;
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
        private readonly WordkiDbContext2 dbContext;
        private readonly IHttpContextProvider contextProvider;

        public GetDetailsQueryHandler(WordkiDbContext2 dbContext, IHttpContextProvider contextProvider)
        {
            this.dbContext = dbContext;
            this.contextProvider = contextProvider;
        }

        public async Task<GroupDetailsDto> Handle(GetDetailsQuery request, CancellationToken cancellationToken)
        {
            var userId = contextProvider.GetUserId();
            var group = await dbContext.Groups
            .Include(g => g.Cards)
            .ThenInclude(c => c.CardDetails)
            .ThenInclude(d => d.Repeats)
            .FirstOrDefaultAsync(g => g.Owner.Id == userId && g.Id == request.GroupId);

            if (group == null)
            {
                return null;
            }

            return new GroupDetailsDto
            {
                Id = group.Id,
                LanguageFront = group.FrontLanguage,
                LanguageBack = group.BackLanguage,
                Name = group.Name,
                CreationDate = group.CreationDate,
                CardsCount = group.CardsCount,
                RepeatsCount = group.Cards.SelectMany(c => c.CardDetails).SelectMany(d => d.Repeats).Count()
            };
        }
    }
}