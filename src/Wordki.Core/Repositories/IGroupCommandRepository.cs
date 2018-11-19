using System.Threading.Tasks;

namespace Wordki.Core.Repositories
{
    public interface IGroupCommandRepository : IRepository
    {
        Task AddAsync(Group group);
        Task UpdateAsync(Group group);
        Task RemoveAsync(long id);
    }
}
