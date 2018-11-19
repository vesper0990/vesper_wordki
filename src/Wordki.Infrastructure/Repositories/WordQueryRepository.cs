using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Wordki.Core;
using Wordki.Core.Repositories;
using Wordki.Infrastructure.EntityFramework;

namespace Wordki.Infrastructure.Repositories
{
    public class WordQueryRepository : IWordQueryRepository
    {
        private readonly WordkiDbContext context;

        public WordQueryRepository(WordkiDbContext context)
        {
            this.context = context;
        }

        public async Task<IEnumerable<Word>> GetAllAsync()
        {
            return await context.Words.ToListAsync();
        }

        public async Task<IEnumerable<Word>> GetAllAsync(long userId)
        {
            return await context.Words.Where(x => x.UserId == userId).ToListAsync();
        }

        public async Task<Word> GetAsync(long id)
        {
            return await context.Words.SingleOrDefaultAsync(x => x.Id == id);
        }

        public Task<Word> GetLastWord(long userId)
        {
            return context.Words.FromSql<Word>($"SELECT * FROM Words WHERE UserId = {userId} ORDER BY Id DESC LIMIT 1").SingleOrDefaultAsync();
        }
    }
}
