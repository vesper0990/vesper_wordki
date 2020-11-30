using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using TestStack.BDDfy;
using Wordki.Api.Repositories.EntityFrameworkRepositories;

namespace Wordki.Tests.E2E.Feature.Lesson.Finish
{
    [TestFixture]
    public class UserFinishLesson : TestBase
    {
        public UserFinishLesson()
        {
            Request = new HttpRequestMessage(HttpMethod.Put, "/lesson/finish");
        }

        void AndGivenRequest()
        {
            var jsonObj = new { lessonId = 1 };
            var jsonString = JsonSerializer.Serialize(jsonObj);
            Request.Content = new StringContent(jsonString, Encoding.UTF8, "application/json");
        }

        async Task GivenUserInDatabase()
        {
            using (var dbContext = new WordkiDbContext(ConnectionStringProvider))
            {
                var user = Utils.GetUser();
                dbContext.Users.Add(user);

                var lesson = Utils.GetLesson();
                lesson.FinishDate = null;
                lesson.User = user;
                await dbContext.Lessons.AddAsync(lesson);

                await dbContext.SaveChangesAsync();
            }
        }

        async Task WhenRequestReceived() => await SendRequest();

        void ThenResponseIsOk()
        {
            Assert.AreEqual(HttpStatusCode.OK, Response.StatusCode);
        }

        async Task AndThenResponseIsEmpty()
        {
            var message = await Response.Content.ReadAsStringAsync();
            Assert.IsEmpty(message);
        }

        async Task AndThenGroupIsAdded()
        {
            using (var dbContext = new WordkiDbContext(ConnectionStringProvider))
            {
                var lesson = await dbContext.Lessons.Include(g => g.User).SingleAsync();

                Assert.AreEqual(Utils.Time, lesson.FinishDate);
            }
        }

        [Test]
        public void Execute()
        {
            this.BDDfy();
        }
    }
}
