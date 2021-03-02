using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using FluentAssertions;
using Newtonsoft.Json;
using NUnit.Framework;
using Wordki.Infrastructure.Framework.ExceptionMiddleware;

namespace Wordki.Tests.E2E.Feature.UserTests.LoginTests
{
    [TestFixture(typeof(UserDoesNotExist))]
    public class LoginFailedTests<TContext> : E2eWebApplicationTestBase where TContext : LoginFailedContext, new()
    {
        private TContext context = new TContext();

        [Test]
        public async Task Test()
        {
            var request = new HttpRequestMessage(HttpMethod.Put, "user/login");
            request.Content = CreateContent(context.GivenContent);

            var response = await Client.SendAsync(request);

            response.StatusCode.Should().Be(context.ExpectedStatusCode);

            var responseMessage = await response.Content.ReadAsStringAsync();
            var responseObject = JsonConvert.DeserializeObject<ApiError>(responseMessage);

            responseObject.Should().BeEquivalentTo(context.ExpectedResponse);
        }
    }

}