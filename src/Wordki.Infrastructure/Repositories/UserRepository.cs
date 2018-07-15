using System.Collections.Generic;
using System.Threading.Tasks;
using Wordki.Core;
using Wordki.Core.Repositories;
using Microsoft.EntityFrameworkCore;
using Wordki.Infrastructure.EntityFramework;

namespace Wordki.Infrastructure.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly WordkiDbContext context;

        public UserRepository(WordkiDbContext context)
        {
            this.context = context;
        }

        public async Task AddUserAsync(User user)
        {
            await context.Users.AddAsync(user);
            await context.SaveChangesAsync();
        }

        public async Task<IEnumerable<User>> GetAllAsync() => await context.Users.ToListAsync();

        public async Task<User> GetUserAsync(string name, string password) 
            => await context.Users.SingleOrDefaultAsync(x => x.Name.Equals(name) && x.Password.Equals(password));

        public async Task UpdateUserAsync(User user)
        {
            context.Users.Update(user);
            await context.SaveChangesAsync();
        }
    }
}
