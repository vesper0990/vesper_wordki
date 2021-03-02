using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using FluentAssertions;
using Newtonsoft.Json;
using Wordki.Api.Domain2;

namespace Wordki.Tests.E2E.Feature
{
    public abstract class QueryTests<TContext, TResponse> : E2eWebApplicationTestBase where TContext : QueryContext<TResponse>, new()
    {
        protected TContext context = new TContext();

        protected async Task TestBase()
        {
            await AddAsync(context.GivenEntity);

            var request = new HttpRequestMessage(HttpMethod.Get, context.GivenUrl);

            var response = await Client.SendAsync(request);

            response.StatusCode.Should().Be(HttpStatusCode.OK);

            var responseContent = JsonConvert.DeserializeObject<TResponse>((await response.Content.ReadAsStringAsync()));
            responseContent.Should().BeEquivalentTo(context.ExpectedResponse);
        }
    }

    public abstract class QueryContext<TResponse>
    {
        public abstract User GivenEntity { get; }
        public abstract string GivenUrl { get; }
        public abstract TResponse ExpectedResponse { get; }
    }
}