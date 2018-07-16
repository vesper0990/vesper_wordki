using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Wordki.Core;
using Wordki.Core.Repositories;
using Wordki.Infrastructure.EntityFramework;

namespace Wordki.Infrastructure.Repositories
{
    public class WordRepository : IWordRepository
    {

        private readonly WordkiDbContext context = context;

        public WordRepository(WordkiDbContext context){
            this.context = context;
        }

        public async Task AddAsync(Word word)
        {
            await context.Words.AddAsync(word);
            await context.SaveChangesAsync();
        }

        public Task AddRangeAsync(IEnumerable<Word> words){
            await context.Words.AddRangeAsync(words);
            await context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Word>> GetAllAsync()
        {
            return await context.Words.ToListAsync();
        }

        public async Task<IEnumerable<Word>> GetAllAsync(long userId)
        {
            return await context.Words.Where(x => x.UserId == userId).ToListAsync();
        }

        public async Task<Word> GetAsync(long id){
            return await context.Words.SingleOrDefaultAsync(x => x.Id = id);
        }

        public async Task RemoveAsync(long id)
        {
            var word = await GetAsync(id);
            context.Words.Remove(word);
            context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Word word)
        {
            await context.Words.Update(word);
        }
    }
}
