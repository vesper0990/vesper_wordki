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
using Wordki.Core.Dtos;
using Wordki.Tests.EndToEnd.Configuration;

namespace Wordki.Tests.E2E.Feature.Card.Update
{
    [TestFixture]
    public class UserUpdateCard : TestBase
    {

        public UserUpdateCard()
        {
            Request = new HttpRequestMessage(HttpMethod.Put, "/word/update");
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

                var word = new Api.Domain.Card
                {
                    Id = 1,
                    Group = group,
                    CardSide1 = new Word
                    {
                        Value = "word1",
                    },
                    CardSide2 = new Word
                    {
                        Value = "word2",
                    },
                    Drawer = Drawer.Create(2),
                    IsVisible = true,
                    WordCreationDate = new DateTime(2020, 01, 01),
                    NextRepeat = new DateTime(2020, 01, 01),
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
                word1 = new
                {
                    value = "asdf"
                },
                word2 = new
                {
                    value = "fdsa"
                },
                isVisible = false
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
                Assert.AreEqual(1, word.Id);
                Assert.AreEqual(1, word.Group.Id);
                Assert.AreEqual("asdf", word.CardSide1.Value);
                Assert.AreEqual("fdsa", word.CardSide2.Value);
                Assert.AreEqual(null, word.Comment);
                Assert.AreEqual(2, word.Drawer);
                Assert.AreEqual(false, word.IsVisible);
            }
        }

        [Test]
        public void Execute()
        {
            this.BDDfy();
        }

    }
}
