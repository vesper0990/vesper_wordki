using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using Microsoft.EntityFrameworkCore;
using System;
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

        public Task ClearDatabase()
        {
            dbContext.Database.EnsureDeleted();
            dbContext.Database.EnsureCreated();

            if(dbContext.Set<Result>().Local.Count != 0)
            {
                dbContext.Set<Result>().Local.ToList().ForEach(x => dbContext.Entry(x).State = EntityState.Detached);
                dbContext.SaveChanges();
            }
            if (dbContext.Set<Word>().Local.Count != 0)
            {
                dbContext.Set<Word>().Local.ToList().ForEach(x => dbContext.Entry(x).State = EntityState.Detached);
                dbContext.SaveChanges();
            }

            if (dbContext.Set<Group>().Local.Count != 0)
            {
                dbContext.Set<Group>().Local.ToList().ForEach(x => dbContext.Entry(x).State = EntityState.Detached);
                dbContext.SaveChanges();
            }

            if (dbContext.Set<User>().Local.Count != 0)
            {
                dbContext.Set<User>().Local.ToList().ForEach(x => dbContext.Entry(x).State = EntityState.Detached);
                dbContext.SaveChanges();
            }
            return Task.CompletedTask;
        }

    }
}
