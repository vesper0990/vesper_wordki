using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using TestStack.BDDfy;
using Wordki.Core.Dtos;
using Wordki.Tests.EndToEnd.Configuration;

namespace Wordki.Tests.EndToEnd.AddGroup
{
    public class AddGroupWithWords : TestBase
    {
        public AddGroupWithWords()
        {
            Request = new System.Net.Http.HttpRequestMessage(HttpMethod.Post, "/addGroup");
        }

        async Task GivenUserInDatabase()
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

                await dbContext.SaveChangesAsync();
            }
        }

        void AndGivenRequest()
        {
            var words = new List<object>();
            for (int i = 0; i < 2; i++)
            {
                words.Add(new
                {
                    language1 = "word1",
                    language2 = "word2",
                    example1 = "example1",
                    example2 = "example2",
                    comment = "comment"
                });
            }
            var jsonObj = new
            {
                name = "groupName",
                language1 = 1,
                language2 = 2,
                words = words
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
            Assert.IsEmpty(message);
        }

        async Task AndThenGroupIsAdded()
        {
            using (var dbContext = new EntityFramework(DapperSettings))
            {
                var group = await dbContext.Groups.SingleAsync();
                Assert.IsNotNull(group);
                Assert.Greater(group.GroupId, 0);
                Assert.AreEqual(group.UserId, 1);
                Assert.AreEqual(group.Name, "groupName");
                Assert.AreEqual(group.GroupLanguage1, 1);
                Assert.AreEqual(group.GroupLanguage2, 2);
                Assert.AreEqual(group.GroupCreationDate, Host.TimeProviderMock.Object.GetTime());

                var words = await dbContext.Words.ToListAsync();

                Assert.AreEqual(2, words.Count);

                foreach(var word in words)
                {
                    Assert.IsNotNull(word);
                    Assert.Greater(word.WordId, 0);
                    Assert.AreEqual(group.GroupId, word.GroupId);
                    Assert.AreEqual("word1", word.WordLanguage1);
                    Assert.AreEqual("word2", word.WordLanguage2);
                    Assert.AreEqual("comment", word.Comment);
                    Assert.AreEqual("example1", word.Example1);
                    Assert.AreEqual("example2", word.Example2);
                    Assert.AreEqual(0, word.Drawer);
                    Assert.AreEqual(true, word.IsVisible);
                    Assert.AreEqual(new DateTime(2000, 1, 1), word.NextRepeat);
                    Assert.AreEqual(Host.TimeProviderMock.Object.GetTime(), word.WordCreationDate);
                };
            }
        }

        [Test]
        public void Execute()
        {
            this.BDDfy();
        }
    }
}
