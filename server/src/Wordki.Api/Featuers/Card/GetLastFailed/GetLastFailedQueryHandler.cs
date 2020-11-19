using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Wordki.Api.Repositories.EntityFrameworkRepositories;
using Wordki.Utils.HttpContext;

namespace Wordki.Api.Featuers.Card.GetLastFailed
{
    public class GetLastFailedQueryHandler : IRequestHandler<GetLastFailedQuery, LastFailedDto>
    {
        private readonly WordkiDbContext dbContext;
        private readonly IHttpContextProvider httpContextProvider;

        public GetLastFailedQueryHandler(WordkiDbContext dbContext, IHttpContextProvider httpContextProvider)
        {
            this.dbContext = dbContext;
            this.httpContextProvider = httpContextProvider;
        }
        public async Task<LastFailedDto> Handle(GetLastFailedQuery request, CancellationToken cancellationToken)
        {
            var userId = httpContextProvider.GetUserId();
            var result = await dbContext.Repeats
            .Include(r => r.Word).ThenInclude(c => c.Group)
            .Where(r => r.Lesson.User.Id == userId && r.Result < 0)
            .OrderByDescending(r => r.DateTime)
            .Take(1)
            .FirstOrDefaultAsync();

            var card = result.Word;
            return card != null ? new LastFailedDto
            {
                GroupName = card.Group.Name,
                Heads = new Dto.SideDto{
                    Value = card.Heads.Value,
                    Example = card.Heads.Example,
                    Drawer = card.Heads.State.Drawer.Value,
                    Language = card.Group.GroupLanguage1,
                },
                Tails = new Dto.SideDto{
                    Value = card.Tails.Value,
                    Example = card.Tails.Example,
                    Drawer = card.Tails.State.Drawer.Value,
                    Language = card.Group.GroupLanguage2,
                },
            } : null;
        }
    }
}
