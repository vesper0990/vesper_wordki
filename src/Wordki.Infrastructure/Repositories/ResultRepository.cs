using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Wordki.Core;
using Wordki.Core.Repositories;
using Wordki.Infrastructure.EntityFramework;

namespace Wordki.Infrastructure.Repositories
{
    public class ResultRepository : IResultRepository
    {
        private readonly WordkiDbContext dbContext;

        public ResultRepository(WordkiDbContext dbcontext)
        {
            dbContext = dbcontext;
        }

        public async Task<IEnumerable<Result>> GetAllAsync()
            => await Task.FromResult(dbContext.Results.ToList());
        

        public async Task<Result> AddAsync(Result result){
            await dbContext.Results.AddAsync(result);
            await dbContext.SaveChangesAsync();
            return result;
        }

        public async Task<IEnumerable<Result>> AddAllAsync(IEnumerable<Result> results)
        {
            await dbContext.Results.AddRangeAsync(results);
            await dbContext.SaveChangesAsync();
            return results;
        }

        
    }
}
