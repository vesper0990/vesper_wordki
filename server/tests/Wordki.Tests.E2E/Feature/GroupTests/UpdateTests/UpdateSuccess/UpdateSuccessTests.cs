using System.Net.Http;
using System.Threading.Tasks;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;

namespace Wordki.Tests.E2E.Feature.GroupTests.UpdateTests
{
    [TestFixture(typeof(UpdateGroup))]
    public class UpdateSuccessTests<TContext> : E2eWebApplicationTestBase where TContext : UpdateSuccessContext, new()
    {
        private TContext context = new TContext();

        [Test]
        public async Task Test()
        {
            await AddAsync(context.GivenEntity);

            var request = new HttpRequestMessage(HttpMethod.Put, "group/update");
            request.Content = CreateContent(context.GivenRequest);

            var response = await Client.SendAsync(request);

            response.StatusCode.Should().Be(context.ExpectedStatusCode);

            var group = await DbContext.Groups.SingleAsync();
            group.Should().BeEquivalentTo(context.ExpectedGroup,
                opt => opt.ExcludingNestedObjects()
                .Excluding(g => g.Cards)
                .IgnoringCyclicReferences());
        }
    }
}