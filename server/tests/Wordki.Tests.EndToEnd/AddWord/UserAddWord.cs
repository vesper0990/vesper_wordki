using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using TestStack.BDDfy;
using Wordki.Core.Dtos;
using Wordki.Tests.EndToEnd.Configuration;

namespace Wordki.Tests.EndToEnd.AddWord
{
    [TestFixture]
    public class UserAddWord : TestBase
    {

        public UserAddWord()
        {
            Request = new HttpRequestMessage(HttpMethod.Post, "/addWord");
        }

        async Task GivenGroupInDatabase()
        {
            using (var dbContext = new EntityFramework(DapperSettings))
            {
                var user = new UserDto
                {
                    Id = 1,
                    Name = "user",
                    Password = Host.EncrypterMock.Object.GetSalt(string.Empty),
                    CreationDate = Host.TimeProviderMock.Object.GetTime(),
                    LastLoginDate = Host.TimeProviderMock.Object.GetTime()
                };
                dbContext.Users.Add(user);

                var group = new GroupDto
                {
                    UserId = 1,
                    GroupId = 1,
                    GroupLanguage1 = 1,
                    GroupLanguage2 = 2,
                    Name = "group",
                    GroupCreationDate = Host.TimeProviderMock.Object.GetTime()
                };
                dbContext.Groups.Add(group);
                await dbContext.SaveChangesAsync();
            }
        }

        void AndGivenRequest()
        {
            Request.Content = new StringContent("{\"groupId\":1,\"language1\":\"word1\",\"language2\":\"word2\"}", Encoding.UTF8, "application/json");
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
            using (var dbContext = new EntityFramework(DapperSettings))
            {
                var word = await dbContext.Words.SingleOrDefaultAsync();
                Assert.IsNotNull(word);
                Assert.Greater(word.WordId, 0);
                Assert.AreEqual(1, word.GroupId);
                Assert.AreEqual("word1", word.WordLanguage1);
                Assert.AreEqual("word2", word.WordLanguage2);
                Assert.AreEqual(string.Empty, word.Comment);
                Assert.AreEqual(string.Empty, word.Example1);
                Assert.AreEqual(string.Empty, word.Example2);
                Assert.AreEqual(0, word.Drawer);
                Assert.AreEqual(true, word.IsVisible);
                Assert.AreEqual(new DateTime(2000, 1, 1), word.NextRepeat);
                Assert.AreEqual(Host.TimeProviderMock.Object.GetTime(), word.WordCreationDate);
            }
        }

        [Test]
        public void Execute()
        {
            this.BDDfy();
        }

    }
}
