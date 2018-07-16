using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Wordki.Core.Repositories;
using Wordki.Infrastructure.DTO;

namespace Wordki.Infrastructure.Services
{
    public class WordService : IWordService
    {
        private readonly IWordRepository wordRepository;

        public WordService(IWordRepository wordRepository)
        {
            this.wordRepository = wordRepository;
        }

        public Task<WordDTO> AddWordAsync(WordDTO wordDto)
        {
            return null;//todo
        }
    }
}
