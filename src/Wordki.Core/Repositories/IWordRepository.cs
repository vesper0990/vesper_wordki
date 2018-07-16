using System.Collections.Generic;
using System.Threading.Tasks;

namespace Wordki.Core.Repositories
{
    public interface IWordRepository : IRepository
    {
        Task<IEnumerable<Word>> GetAllAsync();
        Task<IEnumerable<Word>> GetAllAsync(long userId);
        Task AddAsync(Word word);
        Task AddRangeAsync(IEnumerable<Word> words);
        Task UpdateAsync(Word word);
        Task RemoveAsync(long id);
    }
}
