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

        public async Task AddAsync(User user)
        {
            await context.Users.AddAsync(user);
            await context.SaveChangesAsync();
        }

        public async Task<IEnumerable<User>> GetAllAsync() => await context.Users.ToListAsync();

        public async Task<User> GetAsync(string name, string password)
            => await context.Users.SingleOrDefaultAsync(x => x.Name.Equals(name) && x.Password.Equals(password));

        public async Task<User> GetAsync(long id)
            => await context.Users.SingleOrDefaultAsync(x => x.Id == id);

        public async Task<bool> IsExistsAsync(string name) => await context.Users.CountAsync(x => x.Name.Equals(name)) != 0;
        public async Task<bool> IsExistsAsync(long id, string password) => await context.Users.CountAsync(x => x.Id == id && x.Password.Equals(password)) != 0;
        public async Task<bool> IsExistsAsync(string name, string password) => await context.Users.CountAsync(x => x.Name.Equals(name) && x.Password.Equals(password)) != 0;
        public async Task<User> GetByApiKeyAsync(string apiKey)
            => await context.Users.SingleAsync(x => x.ApiKey.Equals(apiKey));
        public async Task<bool> IsApiKeyExistsAsync(string apiKey) => await context.Users.CountAsync(x => x.ApiKey.Equals(apiKey)) != 0;

        public async Task UpdateAsync(User user)
        {
            context.Users.Update(user);
            await context.SaveChangesAsync();
        }
    }
}
