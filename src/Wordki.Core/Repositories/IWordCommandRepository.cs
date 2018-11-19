using System.Collections.Generic;
using System.Threading.Tasks;

namespace Wordki.Core.Repositories
{
    public interface IWordCommandRepository : IRepository
    {
        Task AddAsync(Word word);
        Task AddAllAsync(IEnumerable<Word> words);
        Task UpdateAsync(Word word);
        Task UpdateAllAsync(IEnumerable<Word> words);
        Task RemoveAsync(long id);
    }
}
