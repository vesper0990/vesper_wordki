using NUnit.Framework;
using System.Net.Http;
using System.Threading.Tasks;

namespace Wordki.Tests.EndToEnd
{
    [TestFixture]
    public class Test
    {

        TestServerMock server;

        public Test()
        {
            server = new TestServerMock();
        }

        [Test]
        public async Task Test1()
        {
            HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Get, "/test/value");
            var response = await server.Client.SendAsync(request);
            var responseBody = await response.Content.ReadAsStringAsync();
            Assert.IsNotNull(responseBody);
        }

    }
}
