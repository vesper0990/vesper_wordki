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
        Task<IEnumerable<User>> GetAllAsync();
        Task<User> GetAsync(string name, string password);
        Task AddAsync(User user);
        Task UpdateAsync(User user);
        Task<User> GetByApiKeyAsync(string apiKey);
    }
}
