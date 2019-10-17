using Moq;
using NUnit.Framework;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Wordki.Tests.UnitTests.Utils;

namespace Wordki.Tests.UnitTests.Controllers
{
    public class ControllerSpecification<TContext, TResult> where TContext : IControllerSpecificationContext<TResult>, new()
    {
        private TContext context = new TContext();
        private ServerMock serverMock;
        private HttpResponseMessage response;

        public ControllerSpecification()
        {
            serverMock = new ServerMock();
        }

        [SetUp]
        public async Task When()
        {
            var request = new HttpRequestMessage(context.Given_Method, context.Given_Url);
            request.Content = new StringContent(context.Given_Content, Encoding.UTF8, "application/json");
            response = await serverMock.Client.SendAsync(request);
        }

        [Test]
        public void Then_ResponseStatusCodeIsCorrect()
        {
            Assert.AreEqual(context.Expected_StatusCode, response.StatusCode);
        }

        [Test]
        public async Task Then_ResponseContentIsCorrect()
        {
            Assert.AreEqual(context.Expected_response, await response.Content.ReadAsStringAsync());
        }
    }

    public interface IControllerSpecificationContext<TReturn>
    {
        TReturn Given_result { get; }
        HttpMethod Given_Method { get; }
        string Given_Url { get; }
        string Given_Content { get; }

        HttpStatusCode Expected_StatusCode { get; }
        string Expected_response { get; }
    }
}
