using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.TestHost;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using NUnit.Framework;
using System;
using System.Net.Http;
using System.Threading.Tasks;
using Wordki.Api.Repositories.EntityFrameworkRepositories;

namespace Wordki.Tests.E2E.Feature
{
    public class E2eWebApplicationFactory : WebApplicationFactory<Startup>
    {

        private readonly Lazy<HttpClient> httpClient;
        private readonly Action<IServiceCollection> initialConfig;

        public HttpClient Client => httpClient.Value;


        public E2eWebApplicationFactory(Action<IServiceCollection> initialConfig = null) : base()
        {
            httpClient = new Lazy<HttpClient>(CreateClient());
            this.initialConfig = initialConfig;
        }

        protected override void ConfigureWebHost(IWebHostBuilder builder)
        {
            builder.ConfigureTestServices(services =>
            {
                initialConfig?.Invoke(services);
            });

            base.ConfigureWebHost(builder);
        }

    }

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
