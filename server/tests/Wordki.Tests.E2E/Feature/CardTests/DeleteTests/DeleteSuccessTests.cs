using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;

namespace Wordki.Tests.E2E.Feature.CardTests.DeleteTests
{
    [TestFixture(typeof(EmptyCard))]
    public class DeleteSuccessTests<TContext> : E2eWebApplicationTestBase where TContext : DeleteSuccessContext, new()
    {
        private readonly TContext context = new TContext();

        [Test]
        public async Task Test()
        {
            await AddAsync(context.GivenEntity);

            var request = new HttpRequestMessage(HttpMethod.Delete, $"card/delete/{context.GivenId}/{context.GivenGroupId}");

            var response = await Client.SendAsync(request);

            response.StatusCode.Should().Be(HttpStatusCode.OK);

            var group = await DbContext.Groups.SingleAsync();
            group.Cards.Should().HaveCount(0);
        }
    }
}