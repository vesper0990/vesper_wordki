using System.Net.Http;
using System.Threading.Tasks;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;

namespace Wordki.Tests.E2E.Feature.CardTests.AddTests
{
    [TestFixture(typeof(AddSingleCard))]
    public class AddSuccessTests<TContext> : E2eWebApplicationTestBase where TContext : AddSuccessContext, new()
    {
        private TContext context = new TContext();

        [Test]
        public async Task Test()
        {
            await AddAsync(context.GivenEntity);

            var request = new HttpRequestMessage(HttpMethod.Post, "card/add");
            request.Content = CreateContent(context.GivenRequest);

            var response = await Client.SendAsync(request);

            response.StatusCode.Should().Be(context.ExpectedStatusCode);
            var cardId = long.Parse(await response.Content.ReadAsStringAsync());

            cardId.Should().Be(context.ExpectedCard.Id);

            var card = await DbContext.Cards
                .Include(x => x.CardDetails)
                .SingleAsync(x => x.Id == cardId);

            card.Should().BeEquivalentTo(context.ExpectedCard,
            opt => opt.ExcludingNestedObjects()
                    .IgnoringCyclicReferences()
                    .Excluding(c => c.CardDetails)
                    .Excluding(c => c.BackDetails)
                    .Excluding(c => c.FrontDetails));

            card.CardDetails.Should().BeEquivalentTo(context.ExpectedCard.CardDetails, opt =>
                opt.Excluding(d => d.Card)
                .Excluding(d => d.Id)
                .Excluding(d => d.Question)
                .Excluding(d => d.Answer)
                .IgnoringCyclicReferences());

        }
    }
}