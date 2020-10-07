using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Threading;
using System.Threading.Tasks;
using Wordki.Api.Repositories.EntityFrameworkRepositories;

namespace Wordki.Api.Featuers.Card.GetLastFailed
{
    public class GetLastFailedQueryHandler : IRequestHandler<GetLastFailedQuery, LastFailedDto>
    {
        private readonly WordkiDbContext dbContext;

        public GetLastFailedQueryHandler(WordkiDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        public async Task<LastFailedDto> Handle(GetLastFailedQuery request, CancellationToken cancellationToken)
        {
            var userId = 1;
            var result = await dbContext.Words
                .Include(w => w.Group)
                .ThenInclude(g => g.User)
                .Include(w => w.Repeats)
                .Where(w => w.Group.User.Id == userId)
                .SelectMany(w => w.Repeats)
                .OrderByDescending(r => r.DateTime)
                .FirstOrDefaultAsync();
            return new LastFailedDto
            {

            };
        }
    }
}
