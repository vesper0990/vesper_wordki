using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using System;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using TestStack.BDDfy;
using Wordki.Api.Repositories.EntityFrameworkRepositories;

namespace Wordki.Tests.E2E.Feature.Lesson.Start
{
    [TestFixture]
    public class UserStartLesson : TestBase
    {
        public UserStartLesson()
        {
            Request = new HttpRequestMessage(HttpMethod.Post, "/lesson/start");
        }

        async Task GivenUserInDatabase()
        {
            using (var dbContext = new WordkiDbContext(ConnectionStringProvider))
            {
                dbContext.Users.Add(Utils.GetUser());
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
            long id = long.Parse(message);
            Assert.Greater(id, 0);
        }

        async Task AndThenGroupIsAdded()
        {
            using (var dbContext = new WordkiDbContext(ConnectionStringProvider))
            {
                var lesson = await dbContext.Lessons.Include(g => g.User).SingleAsync();

                Assert.Greater(lesson.Id, 0);
                Assert.AreEqual(Utils.Time, lesson.StartDate);
                Assert.IsNull(lesson.FinishDate);
            }
        }

        [Test]
        public void Execute()
        {
            this.BDDfy();
        }
    }
}
