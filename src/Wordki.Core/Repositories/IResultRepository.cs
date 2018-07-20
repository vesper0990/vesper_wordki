using System.Collections.Generic;
using System.Threading.Tasks;

namespace Wordki.Core.Repositories
{
    public interface IResultRepository : IRepository
    {
        Task<IEnumerable<Result>> GetAllAsync();

        Task<Result> AddAsync(Result result);

        Task<IEnumerable<Result>> AddAllAsync(IEnumerable<Result> results);


    }
}
