using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;

namespace Wordki.Tests.E2E.Feature.GroupTests.DeleteTests
{
    [TestFixture(typeof(NoGroup))]
    [TestFixture(typeof(EmptyGroup))]
    [TestFixture(typeof(GroupWithWords))]
    public class DeleteSuccessTests<TContext> : E2eWebApplicationTestBase where TContext : DeleteSuccessContext, new()
    {
        private readonly TContext context = new TContext();

        [Test]
        public async Task Test()
        {
            await AddAsync(context.GivenEntity);

            var request = new HttpRequestMessage(HttpMethod.Delete, $"group/delete/{context.GivenId}");

            var response = await Client.SendAsync(request);

            response.StatusCode.Should().Be(context.ExpectedStatusCode);

            var group = await DbContext.Groups.SingleOrDefaultAsync(g => g.Id == context.GivenId);
            group.Should().BeNull();

            var cards = DbContext.Cards.Where(c => c.Group.Id == context.GivenId);
            cards.Should().HaveCount(0);
        }
    }
}