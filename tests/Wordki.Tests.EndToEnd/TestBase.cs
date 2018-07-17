using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using System;
using System.Net.Http;

namespace Wordki.Tests.EndToEnd
{
    public class TestBase : IDisposable
    {

        protected readonly TestServer server;
        protected readonly HttpClient client;

        public TestBase()
        {
            var builder = new WebHostBuilder();
            builder.UseEnvironment("Testing");
            builder.UseStartup<Startup>();
            server = new TestServer(builder);
            client = server.CreateClient();
        }

        public void Dispose()
        {
            throw new NotImplementedException();
        }
    }
}
