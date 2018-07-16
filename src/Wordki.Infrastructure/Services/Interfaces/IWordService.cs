using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Wordki.Infrastructure.DTO;

namespace Wordki.Infrastructure.Services
{
    public interface IWordService : IService
    {
        Task<WordDTO> AddAsync(WordDTO wordDto, long userId);
        Task<IEnumerable<WordDTO>> AddAllAsync(IEnumerable<WordDTO> words, long userId);
        Task UpdateAsync(WordDTO wordDto);
        Task UpdateAllAsync(IEnumerable<WordDTO> wordsDto);
        Task RemoveAsync(long id);
    }
}
