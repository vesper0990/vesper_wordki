using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using NUnit.Framework;
using System.Net.Http;
using System.Threading.Tasks;
using Wordki.Api.Repositories.EntityFrameworkRepositories;

namespace Wordki.Tests.E2E.Feature
{
    public class TestBase
    {
        protected HttpRequestMessage Request { get; set; }
        protected HttpResponseMessage Response { get; set; }
        protected TestServerMock Host { get; set; }
        protected IConnectionStringProvider ConnectionStringProvider { get; }

        public TestBase()
        {
            Host = new TestServerMock();
            var options = Host.Server.Services.GetService(typeof(IOptions<DatabaseConfig>)) as IOptions<DatabaseConfig>;
            ConnectionStringProvider = new SimpleConnectionStringProvider(options);
        }

        [SetUp]
        protected async Task CreateDatabase()
        {
            using (var dbContext = new WordkiDbContext(ConnectionStringProvider))
            {
                await dbContext.Database.EnsureCreatedAsync();
                await dbContext.Database.ExecuteSqlRawAsync("Delete from wrd.\"Repeats\"");
                await dbContext.Database.ExecuteSqlRawAsync("Delete from wrd.\"Lessons\"");
                await dbContext.Database.ExecuteSqlRawAsync("Delete from wrd.\"Words\"");
                await dbContext.Database.ExecuteSqlRawAsync("Delete from wrd.\"Groups\"");
                await dbContext.Database.ExecuteSqlRawAsync("Delete from wrd.\"Users\"");
            }
        }

        protected async Task SendRequest()
        {
            Response = await Host.Client.SendAsync(Request);
        }
    }
}
