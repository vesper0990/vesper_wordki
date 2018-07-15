using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Wordki.Core.Repositories
{
    public interface IGroupRepository : IRepository
    {
        IQueryable<Group> GetGroups();
        Task<Group> GetAsync(long id, bool withChildren);
        Task<IEnumerable<Group>> GetAllAsync(bool withChildren);
        Task<IEnumerable<Group>> GetAllByUserAsync(long userId, bool withChildren);
        Task AddAsync(Group group);
        Task UpdateAsync(Group group);
        Task Remove(long id);
    }
}
