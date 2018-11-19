using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Wordki.Core;
using Wordki.Core.Repositories;
using Wordki.Infrastructure.EntityFramework;

namespace Wordki.Infrastructure.Repositories
{
    public class ResultQueryRepository : IResultQueryRepository
    {
        private readonly WordkiDbContext dbContext;

        public ResultQueryRepository(WordkiDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public Task<IEnumerable<Result>> GetAllAsync()
        {
            return Task.FromResult(dbContext.Results.AsEnumerable());
        }
    }
}
