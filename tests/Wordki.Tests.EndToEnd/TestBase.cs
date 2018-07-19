using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Wordki.Core;
using Wordki.Infrastructure.EntityFramework;
using Wordki.Infrastructure.Services;

namespace Wordki.Tests.EndToEnd
{
    public class TestBase
    {
        protected readonly TestServer server;
        protected readonly HttpClient client;
        protected readonly WordkiDbContext dbContext;
        protected readonly IEncrypter encrypter;

        public TestBase()
        {
            server = new TestServer(new WebHostBuilder()
                .UseEnvironment("Testing")
                .UseStartup<Startup>());
            client = server.CreateClient();
            dbContext = server.Host.Services.GetService(typeof(WordkiDbContext)) as WordkiDbContext;
            encrypter = server.Host.Services.GetService(typeof(IEncrypter)) as IEncrypter;
        }

        public async Task ClearDatabase()
        {
            await dbContext.Database.EnsureDeletedAsync();
            await dbContext.Database.EnsureCreatedAsync();
            dbContext.Set<User>().Local.ToList().ForEach(x =>
            {
                dbContext.Entry(x).State = EntityState.Detached;
            });
            dbContext.SaveChanges();
        }

    }
}
