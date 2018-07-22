using System;
using System.Linq;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Wordki.Core;
using Wordki.Core.Repositories;
using Wordki.Infrastructure.EntityFramework;

namespace Wordki.Infrastructure.Repositories
{
    public class WordRepository : IWordRepository
    {

        private readonly WordkiDbContext context;

        public WordRepository(WordkiDbContext context){
            this.context = context;
        }

        public async Task AddAsync(Word word)
        {
            if(word.GroupId <= 0)
            {
                throw new ApiException($"Cannot insert word with groupId '{word.GroupId}'", DTO.ErrorCode.InsertToDbException);
            }
            try
            {
                await context.Words.AddAsync(word);
                await context.SaveChangesAsync();
            }
            catch(DbUpdateException e)
            {
                throw new ApiException("Exception during inserting Word to db", e, DTO.ErrorCode.InsertToDbException);
            }
        }

        public async Task AddAllAsync(IEnumerable<Word> words){
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
            return await context.Words.SingleOrDefaultAsync(x => x.Id == id);
        }

        public async Task RemoveAsync(long id)
        {
            var word = await GetAsync(id);
            context.Words.Remove(word);
            await context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Word word)
        {
            context.Words.Update(word);
            await context.SaveChangesAsync();
        }

        public async Task UpdateAllAsync(IEnumerable<Word> words){
            context.Words.UpdateRange(words);
            await context.SaveChangesAsync();
        }
    }
}
