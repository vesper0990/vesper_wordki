using Autofac;
using Autofac.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using System.Net.Http;

namespace Wordki.Tests.UnitTests.Utils
{
    public class ServerMock
    {
        public TestServer Server { get; private set; }
        public HttpClient Client { get; private set; }

        public ServerMock()
        {

            var webHostBuilder = new WebHostBuilder()
                .ConfigureTestContainer<ContainerBuilder>(builder =>
                {
                })
                .ConfigureServices(services => services.AddAutofac())
                .UseEnvironment("Testing")
                .UseStartup<Startup>();

            Server = new TestServer(webHostBuilder);
            Client = Server.CreateClient();
        }
    }
}
