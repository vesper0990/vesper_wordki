using System.Collections.Generic;
using System.Threading.Tasks;

namespace Wordki.Core.Repositories
{
    public interface IWordQueryRepository : IRepository
    {
        Task<IEnumerable<Word>> GetAllAsync();
        Task<IEnumerable<Word>> GetAllAsync(long userId);
        Task<Word> GetLastWord(long userId);
    }
}
