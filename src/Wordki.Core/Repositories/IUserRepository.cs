using System.Collections.Generic;
using System.Threading.Tasks;

namespace Wordki.Core.Repositories
{
    public interface IUserRepository : IRepository
    {
        Task<IEnumerable<User>> GetAllAsync();
        Task<User> GetUserAsync(string name, string password);
        Task AddUserAsync(User user);
        Task UpdateUserAsync(User user);
    }
}
