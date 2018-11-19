using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using Wordki.Core;
using Wordki.Core.Repositories;
using Wordki.Infrastructure.EntityFramework;

namespace Wordki.Infrastructure.Repositories
{
    public class WordCommandRepository : IWordCommandRepository
    {
        private readonly WordkiDbContext context;

        public WordCommandRepository(WordkiDbContext context)
        {
            this.context = context;
        }

        public async Task AddAsync(Word word)
        {
            if (word.GroupId <= 0)
            {
                throw new ApiException($"Cannot insert word with groupId '{word.GroupId}'", DTO.ErrorCode.InsertToDbException);
            }
            try
            {
                await context.Words.AddAsync(word);
                await context.SaveChangesAsync();
            }
            catch (DbUpdateException e)
            {
                throw new ApiException("Exception during inserting Word to db", e, DTO.ErrorCode.InsertToDbException);
            }
        }

        public async Task AddAllAsync(IEnumerable<Word> words)
        {
            try
            {
                await context.Words.AddRangeAsync(words);
                await context.SaveChangesAsync();
            }
            catch (DbUpdateException e)
            {
                throw new ApiException("Exception during inserting Words to db", e, DTO.ErrorCode.InsertToDbException);
            }
        }

        public async Task RemoveAsync(long id)
        {
            var word = new Word() { Id = id };
            context.Words.Remove(word);
            await context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Word word)
        {
            try
            {
                context.Words.Update(word);
                await context.SaveChangesAsync();
            }
            catch (DbUpdateException e)
            {
                throw new ApiException("Exception during updating word in db", e, DTO.ErrorCode.UpdateInDbException);
            }
        }

        public async Task UpdateAllAsync(IEnumerable<Word> words)
        {
            try
            {
                context.Words.UpdateRange(words);
                await context.SaveChangesAsync();
            }
            catch (DbUpdateException e)
            {
                throw new ApiException("Exception during updating words in db", e, DTO.ErrorCode.UpdateInDbException);
            }
        }
    }
}
