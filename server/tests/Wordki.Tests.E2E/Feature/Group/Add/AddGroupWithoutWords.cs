using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using System;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using TestStack.BDDfy;
using Wordki.Api.Featuers.Group.Add;
using Wordki.Api.Repositories.EntityFrameworkRepositories;

namespace Wordki.Tests.E2E.Feature.Group.Add
{
    [TestFixture]
    public class AddGroupWithoutWords : TestBase
    {
        public AddGroupWithoutWords()
        {
            Request = new HttpRequestMessage(HttpMethod.Post, "/group/add");
        }

        async Task GivenUserInDatabase()
        {
            using (var dbContext = new WordkiDbContext(ConnectionStringProvider))
            {
                dbContext.Users.Add(Utils.GetUser());
                await dbContext.SaveChangesAsync();
            }
        }

        void AndGivenRequest()
        {
            var jsonObj = new AddGroupCommand
            {
                UserId = 1,
                Name = "groupName",
                LanguageFront = 1,
                LanguageBack = 2,
            };
            var jsonString = JsonSerializer.Serialize(jsonObj);
            Request.Content = new StringContent(jsonString, Encoding.UTF8, "application/json");
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
                var group = await dbContext.Groups.Include(g => g.User).SingleAsync();
                Assert.IsNotNull(group);
                Assert.Greater(group.Id, 0);
                Assert.AreEqual(group.User.Id, 1);
                Assert.AreEqual(group.Name, "groupName");
                Assert.AreEqual(group.GroupLanguage1, 1);
                Assert.AreEqual(group.GroupLanguage2, 2);
                Assert.AreEqual(group.GroupCreationDate, Utils.Time);

                var wordsCount = await dbContext.Words.CountAsync();
                Assert.AreEqual(0, wordsCount);

            }
        }

        [Test]
        public void Execute()
        {
            this.BDDfy();
        }
    }
}
