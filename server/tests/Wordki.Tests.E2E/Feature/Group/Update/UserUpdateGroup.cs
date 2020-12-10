using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using System;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using TestStack.BDDfy;
using Wordki.Api.Domain;
using Wordki.Api.Repositories.EntityFrameworkRepositories;

namespace Wordki.Tests.E2E.Feature.Group.Add
{
    [TestFixture]
    public class UserUpdateGroup : TestBase
    {

        public UserUpdateGroup()
        {
            Request = new HttpRequestMessage(HttpMethod.Put, "/group/update");
        }

        async Task GivenGroupInDatabase()
        {
            using (var dbContext = new WordkiDbContext(ConnectionStringProvider))
            {
                var user = new Api.Domain.User
                {
                    Id = 1,
                    Name = "user",
                    Password = Host.EncrypterMock.Object.GetSalt(string.Empty),
                    CreationDate = Host.Time2ProviderMock.Object.GetTime(),
                    LastLoginDate = Host.Time2ProviderMock.Object.GetTime()
                };
                dbContext.Users.Add(user);

                var group = new Api.Domain.Group
                {
                    Id = 1,
                    GroupLanguage1 = 1,
                    GroupLanguage2 = 2,
                    Name = "group",
                    GroupCreationDate = Host.Time2ProviderMock.Object.GetTime()
                };
                dbContext.Groups.Add(group);

                var word = new Api.Domain.Card
                {
                    Heads = new Side { Value = "word1" },
                    Tails = new Side { Value = "word2" },
                    IsVisible = true,
                    WordCreationDate = new DateTime(2020, 01, 01),
                };
                dbContext.Words.Add(word);
                await dbContext.SaveChangesAsync();
            }
        }

        void AndGivenRequest()
        {
            var content = new
            {
                id = 1,
                name = "group2",
                language1 = 2,
                language2 = 1
            };
            Request.Content = new StringContent(JsonSerializer.Serialize(content), Encoding.UTF8, "application/json");
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

        async Task AndThenWordIsAdded()
        {
            using (var dbContext = new WordkiDbContext(ConnectionStringProvider))
            {
                var group = await dbContext.Groups.SingleOrDefaultAsync();
                Assert.IsNotNull(group);
                Assert.AreEqual(1, group.Id);
                Assert.AreEqual("group2", group.Name);
                Assert.AreEqual(2, group.GroupLanguage1);
                Assert.AreEqual(1, group.GroupLanguage2);
            }
        }

        [Test]
        public void Execute()
        {
            this.BDDfy();
        }

    }
}
