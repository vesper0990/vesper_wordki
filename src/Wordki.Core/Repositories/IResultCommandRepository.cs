using System.Collections.Generic;
using System.Threading.Tasks;

namespace Wordki.Core.Repositories
{
    public interface IResultCommandRepository : IRepository
    {

        Task<Result> AddAsync(Result result);

        Task<IEnumerable<Result>> AddAllAsync(IEnumerable<Result> results);

    }
}
