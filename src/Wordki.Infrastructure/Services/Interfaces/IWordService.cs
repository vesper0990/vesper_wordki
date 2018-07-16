using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Wordki.Infrastructure.DTO;

namespace Wordki.Infrastructure.Services
{
    public interface IWordService : IService
    {

        Task<WordDTO> AddWordAsync(WordDTO wordDto);
        Task<IEnumerable<WordDTO>> AddWordRangeAsync(IEnumerable<WordDTO> words);
        Task UpdateAsync(WordDTO wordDto);
        Task UpdateRangeAsync(IEnumerable<WordDTO> wordsDto);
        Task RemoveAsync(long id);
    }
}
