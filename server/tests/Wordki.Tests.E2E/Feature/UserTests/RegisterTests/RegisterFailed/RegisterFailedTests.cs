using System.Net.Http;
using System.Threading.Tasks;
using FluentAssertions;
using Newtonsoft.Json;
using NUnit.Framework;
using Wordki.Infrastructure.Framework.ExceptionMiddleware;

namespace Wordki.Tests.E2E.Feature.UserTests.RegisterTests
{
    [TestFixture(typeof(UserExists))]
    public class RegisterFailedTests<TContext> : E2eWebApplicationTestBase where TContext : RegisterFailedContext, new()
    {
        private readonly TContext context = new TContext();

        [Test]
        public async Task Test()
        {
            await AddAsync(context.GivenEntity);

            var request = new HttpRequestMessage(HttpMethod.Post, "user/register");
            request.Content = CreateContent(context.GivenRequest);

            var response = await Client.SendAsync(request);

            response.StatusCode.Should().Be(context.ExpectedStatusCode);
            var responseContent = await response.Content.ReadAsStringAsync();

            var apiError = JsonConvert.DeserializeObject<ApiError>(responseContent);
            apiError.Should().BeEquivalentTo(context.ExpectedResponse);
        }
    }
}