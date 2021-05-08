using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;

namespace Wordki.Tests.E2E.Feature.LessonTests.StartTests
{
    [TestFixture(typeof(StartLesson))]
    public class StartTests<TContext> : E2eWebApplicationTestBase where TContext : StartSuccessContext, new()
    {
        private TContext context = new TContext();

        [Test]
        public async Task Test()
        {
            await AddAsync(context.GivenEntity);

            var request = new HttpRequestMessage(HttpMethod.Post, "lesson/start");

            var response = await Client.SendAsync(request);

            response.StatusCode.Should().Be(HttpStatusCode.OK);
            var lessonId = long.Parse(await response.Content.ReadAsStringAsync());

            var lesson = await DbContext.Lessons
                .Include(x => x.Repeats)
                .SingleAsync();

            lessonId.Should().Be(context.ExpectedLesson.Id);
            lesson.Should().BeEquivalentTo(context.ExpectedLesson, opt =>
            opt.IgnoringCyclicReferences()
                .Excluding(l => l.Owner)
            );
        }
    }
}