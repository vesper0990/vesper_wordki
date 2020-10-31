using System.Collections.Generic;
using System.Threading.Tasks;
using Wordki.Api.Domain;

namespace Wordki.Api.Repositories
{
    public interface IUserRepository
    {
        Task<User> GetUser(string name, string password);
        Task<User> GetUser(long id);
        Task<IEnumerable<User>> GetUsers();
        Task Save(User user);
    }
}
