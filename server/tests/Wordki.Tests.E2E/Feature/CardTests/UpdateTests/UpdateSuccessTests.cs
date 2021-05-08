using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;

namespace Wordki.Tests.E2E.Feature.CardTests.UpdateTests
{
    [TestFixture(typeof(SingleCard))]
    public class UpdateSuccessTests<TContext> : E2eWebApplicationTestBase where TContext : UpdateSuccessContext, new()
    {
        private TContext context = new TContext();

        [Test]
        public async Task Test()
        {
            await AddAsync(context.GivenEntity);

            var request = new HttpRequestMessage(HttpMethod.Put, "card/update");
            request.Content = CreateContent(context.GivenRequest);

            var response = await Client.SendAsync(request);

            response.StatusCode.Should().Be(HttpStatusCode.OK);

            var group = await DbContext.Groups.Include(x => x.Cards).SingleAsync();
            var card = group.Cards.Single();
            card.Should().BeEquivalentTo(context.ExpectedCard,
            opt => opt.ExcludingNestedObjects()
                    .IgnoringCyclicReferences()
                    .Excluding(c => c.Group)
                    .Excluding(c => c.CardDetails)
                    .Excluding(c => c.BackDetails)
                    .Excluding(c => c.FrontDetails));
        }
    }
}
