using System.Collections.Generic;
using System.Threading.Tasks;

namespace Wordki.Core.Repositories
{
    public interface IWordRepository : IRepository
    {
        Task<IEnumerable<Word>> GetAllAsync();
        Task<IEnumerable<Word>> GetAllAsync(long userId);
        Task AddAsync(Word word);
        Task AddAllAsync(IEnumerable<Word> words);
        Task UpdateAsync(Word word);
        Task UpdateAllAsync(IEnumerable<Word> words);
        Task RemoveAsync(long id);
    }
}
