using System.Net.Http;
using System.Threading.Tasks;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;

namespace Wordki.Tests.E2E.Feature.GroupTests.AddTests
{
    [TestFixture(typeof(AddEmptyNewGroup))]
    [TestFixture(typeof(AddNewGroupWithWords))]
    public class AddSuccessTests<TContext> : E2eWebApplicationTestBase where TContext : AddSuccessContext, new()
    {
        private TContext context = new TContext();

        [Test]
        public async Task Test()
        {
            await AddAsync(context.GivenEntity);

            var request = new HttpRequestMessage(HttpMethod.Post, "group/add");
            request.Content = CreateContent(context.GivenRequest);

            var response = await Client.SendAsync(request);

            response.StatusCode.Should().Be(context.ExpectedStatusCode);
            var groupId = long.Parse(await response.Content.ReadAsStringAsync());

            var group = await DbContext.Groups.Include(g => g.Cards).SingleAsync();
            group.Should().BeEquivalentTo(context.ExpectedGroup,
            opt => opt.ExcludingNestedObjects()
            .Excluding(g => g.Cards)
            .IgnoringCyclicReferences());

            group.Cards.Should().BeEquivalentTo(context.ExpectedGroup.Cards,
             opt => opt.Excluding(c => c.Group)
             .Excluding(c => c.CardDetails)
             .IgnoringCyclicReferences());
        }
    }
}