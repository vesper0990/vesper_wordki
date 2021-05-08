using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using Wordki.Api.Domain2;
using Wordki.Api.Featuers.Lesson.Answer;

namespace Wordki.Tests.E2E.Feature.LessonTests.AnswareTests
{
    public class AnswareTests<TContext> : E2eWebApplicationTestBase where TContext : AnswareSuccessContext, new()
    {
        private TContext context = new TContext();

        [Test]
        public async Task Test()
        {
            await AddAsync(context.GivenEntity);

            var request = new HttpRequestMessage(HttpMethod.Post, "lesson/anware");
            request.Content = CreateContent(context.GivenRequest);

            var response = await Client.SendAsync(request);

            response.StatusCode.Should().Be(HttpStatusCode.OK);

            var lesson = await DbContext.Lessons
            .Include(l => l.Repeats)
            .SingleAsync();

            var repeat = lesson.Repeats.Single(x => x.Id == context.ExpectedRepeat.Id);
            repeat.Should().BeEquivalentTo(context.ExpectedRepeat, opt => opt.IgnoringCyclicReferences()
                                                                            .Excluding(x => x.Lesson)
                                                                            .Excluding(x => x.Details));

            var card = await DbContext.Cards.SingleAsync();
        }
    }

    public abstract class AnswareSuccessContext
    {
        public abstract User GivenEntity { get; }
        public abstract AnswerCommand GivenRequest { get; }
        public abstract Card ExpectedCard { get; }
        public abstract Repeat ExpectedRepeat { get; }
    }

    public class CorrectAnswer : AnswareSuccessContext
    {
        public override User GivenEntity { get; }

        public override AnswerCommand GivenRequest { get; }

        public override Card ExpectedCard { get; }

        public override Repeat ExpectedRepeat { get; }
    }
}