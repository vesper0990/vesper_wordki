using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Wordki.Core;
using Wordki.Core.Repositories;

namespace Wordki.Infrastructure.Repositories
{
    public class WordRepository : IWordRepository
    {
        public Task AddWordAsync(Word word)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Word>> GetAllAsync()
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Word>> GetAllAsync(long userId)
        {
            throw new NotImplementedException();
        }

        public Task RemoveWordAsync(long id)
        {
            throw new NotImplementedException();
        }

        public Task UpdateWordAsync(Word word)
        {
            throw new NotImplementedException();
        }
    }
}
