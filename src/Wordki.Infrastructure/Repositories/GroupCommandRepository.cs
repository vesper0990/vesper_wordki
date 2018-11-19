using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;
using Wordki.Core;
using Wordki.Core.Repositories;
using Wordki.Infrastructure.EntityFramework;

namespace Wordki.Infrastructure.Repositories
{
    public class GroupCommandRepository : IGroupCommandRepository
    {

        private readonly WordkiDbContext context;

        public GroupCommandRepository(WordkiDbContext context)
        {
            this.context = context;
        }

        public async Task AddAsync(Group group)
        {
            try
            {
                await context.Groups.AddAsync(group);
                await context.SaveChangesAsync();
            }
            catch (ArgumentException e)
            {
                throw new ApiException("Exception during inserting group to db", e, DTO.ErrorCode.InsertToDbException);
            }
            catch (DbUpdateException e)
            {
                throw new ApiException("Exception during inserting group to db", e, DTO.ErrorCode.InsertToDbException);
            }
        }

        public async Task RemoveAsync(long id)
        {
            if (id <= 0)
            {
                throw new ApiException("Exception during removing group from db", DTO.ErrorCode.RemovingFromDbException);
            }
            Group group = new Group() { Id = id };
            context.Groups.Remove(group);
            await context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Group group)
        {
            try
            {
                context.Groups.Update(group);
                await context.SaveChangesAsync();
            }
            catch (ArgumentException e)
            {
                throw new ApiException("Exception during updating group in db", e, DTO.ErrorCode.UpdateInDbException);
            }
            catch (DbUpdateConcurrencyException e)
            {
                throw new ApiException("Exception during updating group in db", e, DTO.ErrorCode.UpdateInDbException);
            }

        }
    }
}
