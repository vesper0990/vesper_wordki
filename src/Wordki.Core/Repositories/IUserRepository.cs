using System.Collections.Generic;
using System.Threading.Tasks;

namespace Wordki.Core.Repositories
{
    public interface IUserRepository : IRepository
    {
        Task<bool> IsExistsAsync(string name);
        Task<bool> IsExistsAsync(long id, string password);
        Task<bool> IsExistsAsync(string name, string password);
        Task<bool> IsApiKeyExistsAsync(string apiKey);
        Task<User> GetAsync(string name, string password);
        Task<User> GetAsync(long id);
        Task<User> GetByApiKeyAsync(string apiKey);
        Task<IEnumerable<User>> GetAllAsync();
        Task AddAsync(User user);
        Task UpdateAsync(User user);
    }
}
