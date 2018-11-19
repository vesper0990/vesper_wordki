using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using Wordki.Core;
using Wordki.Core.Repositories;
using Wordki.Infrastructure.DTO;
using Wordki.Infrastructure.EntityFramework;

namespace Wordki.Infrastructure.Repositories
{
    public class ResultCommandRepository : IResultCommandRepository
    {
        private readonly WordkiDbContext dbContext;

        public ResultCommandRepository(WordkiDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<Result> AddAsync(Result result)
        {
            try
            {
                if (result.GroupId <= 0 || result.UserId <= 0)
                {
                    throw new ApiException("Cannot add result with wrong  groupId or userId", ErrorCode.InsertToDbException);
                }
                await dbContext.Results.AddAsync(result);
                await dbContext.SaveChangesAsync();
            }
            catch (DbUpdateException e)
            {
                throw new ApiException("Exception during adding result to db", e, ErrorCode.InsertToDbException);
            }
            return result;
        }

        public async Task<IEnumerable<Result>> AddAllAsync(IEnumerable<Result> results)
        {
            try
            {
                await dbContext.Results.AddRangeAsync(results);
                await dbContext.SaveChangesAsync();
            }
            catch (DbUpdateException e)
            {
                throw new ApiException("Exception during adding result to db", e, ErrorCode.InsertToDbException);
            }
            return results;
        }
    }
}
