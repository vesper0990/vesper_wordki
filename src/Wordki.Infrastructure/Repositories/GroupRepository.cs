using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Wordki.Core;
using Wordki.Core.Repositories;
using Wordki.Infrastructure.EntityFramework;
using Microsoft.EntityFrameworkCore;
using System;

namespace Wordki.Infrastructure.Repositories
{
    public class GroupRepository : IGroupRepository
    {
        private readonly WordkiDbContext context;

        public GroupRepository(WordkiDbContext context)
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
            }catch (DbUpdateException e)
            {
                throw new ApiException("Exception during inserting group to db", e, DTO.ErrorCode.InsertToDbException);
            }
        }

        public async Task<IEnumerable<Group>> GetAllAsync(bool withChildren = false)
        {
            if (withChildren)
            {
                return await context.Groups.Include(x => x.Words).Include(x => x.Results).ToListAsync();
            }
            else
            {
                return await context.Groups.ToListAsync();
            }
        }

        public async Task<IEnumerable<Group>> GetAllByUserAsync(long userId, bool withChildren = false)
        {
            var groups = context.Groups.Where(x => x.UserId == userId);
            if (withChildren)
            {
                return await groups.Include(x => x.Words).Include(x => x.Results).ToListAsync();
            }
            else
            {
                return await groups.ToListAsync();
            }
        }

        public async Task<Group> GetAsync(long id, bool withChildren = false)
        {
            if (withChildren)
            {
                return await context.Groups.Include(x => x.Words).Include(x => x.Results).SingleAsync(x => x.Id == id);
            }
            else
            {
                return await context.Groups.SingleAsync(x => x.Id == id);
            }
        }

        public IQueryable<Group> GetGroups()
        {
            return context.Groups;
        }

        public async Task RemoveAsync(long id)
        {
            if(id <= 0){
                throw new ApiException("Exception during removing group from db", DTO.ErrorCode.RemovingFromDbException);
            }
            Group group = null;
            try
            {
                group = await GetAsync(id);
            }
            catch (InvalidOperationException e)
            {
                throw new ApiException($"Group with id '{id} not exits'", e, DTO.ErrorCode.RemovingFromDbException);
            }

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
            }catch(DbUpdateConcurrencyException e)
            {
                throw new ApiException("Exception during updating group in db", e, DTO.ErrorCode.UpdateInDbException);
            }

        }
    }
}
