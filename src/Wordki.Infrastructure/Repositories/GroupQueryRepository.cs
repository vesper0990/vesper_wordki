using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Wordki.Core;
using Wordki.Core.Repositories;
using Wordki.Infrastructure.EntityFramework;
using Microsoft.EntityFrameworkCore;

namespace Wordki.Infrastructure.Repositories
{
    public class GroupQueryRepository : IGroupQueryRepository
    {
        private readonly WordkiDbContext context;

        public GroupQueryRepository(WordkiDbContext context)
        {
            this.context = context;
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
    }
}
