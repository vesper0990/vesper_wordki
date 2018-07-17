using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using System.Net.Http;
using System.Threading.Tasks;
using Wordki.Infrastructure.EntityFramework;

namespace Wordki.Tests.EndToEnd
{
    public class TestBase
    {
        protected readonly TestServer server;
        protected readonly HttpClient client;
        protected readonly WordkiDbContext dbContext;

        public TestBase()
        {
            server = new TestServer(new WebHostBuilder()
                .UseEnvironment("Testing")
                .UseStartup<Startup>());
            client = server.CreateClient();
            dbContext = server.Host.Services.GetService(typeof(WordkiDbContext)) as WordkiDbContext;
        }

        public async Task ClearDatabase()
        {
            await dbContext.Database.EnsureDeletedAsync();
            await dbContext.Database.EnsureCreatedAsync();
        }
    }
}
