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

namespace Wordki.Tests.E2E.Feature.Card.Add
{
    [TestFixture]
    public class UserAddCard : TestBase
    {

        public UserAddCard()
        {
            Request = new HttpRequestMessage(HttpMethod.Post, "/word/add");
        }

        async Task GivenGroupInDatabase()
        {
            using (var dbContext = new WordkiDbContext(Options))
            {
                var user = new Api.Domain.User
                {
                    Id = 1,
                    Name = "user",
                    Password = Host.EncrypterMock.Object.GetSalt(string.Empty),
                    CreationDate = Host.TimeProviderMock.Object.Now(),
                    LastLoginDate = Host.TimeProviderMock.Object.Now()
                };
                dbContext.Users.Add(user);

                var group = new Api.Domain.Group
                {
                    User = user,
                    Id = 1,
                    GroupLanguage1 = 1,
                    GroupLanguage2 = 2,
                    Name = "group",
                    GroupCreationDate = Host.TimeProviderMock.Object.Now()
                };
                dbContext.Groups.Add(group);
                await dbContext.SaveChangesAsync();
            }
        }

        void AndGivenRequest()
        {
            var content = new
            {
                groupId = 1,
                cardSide1 = new
                {
                    value = "word1"
                },
                cardSide2 = new
                {
                    value = "word2"
                },
                IsVisible = true
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
            using (var dbContext = new WordkiDbContext(Options))
            {
                var word = await dbContext.Words.SingleOrDefaultAsync();
                Assert.IsNotNull(word);
                Assert.Greater(word.Id, 0);
                Assert.AreEqual(1, word.Group.Id);
                Assert.AreEqual("word1", word.CardSide1.Value);
                Assert.AreEqual("word2", word.CardSide2.Value);
                Assert.AreEqual(string.Empty, word.Comment);
                Assert.AreEqual(0, word.Drawer);
                Assert.AreEqual(true, word.IsVisible);
                Assert.AreEqual(new DateTime(2000, 1, 1), word.NextRepeat);
                Assert.AreEqual(Host.TimeProviderMock.Object.Now(), word.WordCreationDate);
            }
        }

        [Test]
        public void Execute()
        {
            this.BDDfy();
        }
    }
}
