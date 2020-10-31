using System.Threading.Tasks;

namespace Wordki.Api.Repositories.EntityFrameworkRepositories
{
       
    public interface IDatabaseInitializer
    {
        Task Init();
    }

    public class DatabaseInitializer : IDatabaseInitializer
    {
        private readonly WordkiDbContext dbContext;

        public DatabaseInitializer(WordkiDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task Init()
        {
            await dbContext.Database.EnsureCreatedAsync();
        }
    }
}
