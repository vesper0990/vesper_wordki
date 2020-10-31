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
        protected IOptions<DatabaseConfig> Options { get; }

        public TestBase()
        {
            Host = new TestServerMock();
            Options = Host.Server.Services.GetService(typeof(IOptions<DatabaseConfig>)) as IOptions<DatabaseConfig>;
        }

        [SetUp]
        protected async Task CreateDatabase()
        {
            using (var dbContext = new WordkiDbContext(Options))
            {
                await dbContext.Database.EnsureCreatedAsync();
                await dbContext.Database.ExecuteSqlRawAsync("Delete from Repeats");
                await dbContext.Database.ExecuteSqlRawAsync("Delete from Words");
                await dbContext.Database.ExecuteSqlRawAsync("Delete from `Groups`");
                await dbContext.Database.ExecuteSqlRawAsync("Delete from Users");
            }
        }

        protected async Task SendRequest()
        {
            Response = await Host.Client.SendAsync(Request);
        }
    }
}
