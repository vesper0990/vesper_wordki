using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using Wordki.Api.Domain;

namespace Wordki.Api.Repositories.EntityFrameworkRepositories
{
    public class EfUserRepository : IUserRepository
    {
        private readonly WordkiDbContext dbContext;

        public EfUserRepository(WordkiDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<User> GetUser(string name, string password)
            => await dbContext.Users.SingleOrDefaultAsync(u => u.Name.Equals(name) && u.Password.Equals(password));

        public async Task<User> GetUser(long id)
            => await dbContext.Users.SingleOrDefaultAsync(u => u.Id == id);

        public async Task<IEnumerable<User>> GetUsers()
            => await dbContext.Users.ToListAsync();

        public async Task Save(User user)
        {
            await dbContext.Users.AddAsync(user);

        }
    }
}
