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
    }
}
