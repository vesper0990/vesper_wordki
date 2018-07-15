using System.Collections.Generic;
using System.Threading.Tasks;

namespace Wordki.Core.Repositories
{
    public interface IWordRepository : IRepository
    {
        Task<IEnumerable<Word>> GetAllAsync();
        Task<IEnumerable<Word>> GetAllAsync(long userId);
        Task AddWordAsync(Word word);
        Task UpdateWordAsync(Word word);
        Task RemoveWordAsync(long id);
    }
}
