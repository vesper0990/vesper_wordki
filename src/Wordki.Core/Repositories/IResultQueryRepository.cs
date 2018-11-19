using System.Collections.Generic;
using System.Threading.Tasks;

namespace Wordki.Core.Repositories
{
    public interface IResultQueryRepository : IRepository
    {
        Task<IEnumerable<Result>> GetAllAsync();
    }
}
