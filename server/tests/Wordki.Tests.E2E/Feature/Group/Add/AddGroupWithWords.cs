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
using Wordki.Api.Repositories.EntityFrameworkRepositories;

namespace Wordki.Tests.E2E.Feature.Group.Add
{
    public class AddGroupWithWords : TestBase
    {
        public AddGroupWithWords()
        {
            Request = new HttpRequestMessage(HttpMethod.Post, "/group/add");
        }

        async Task GivenUserInDatabase()
        {
            using (var dbContext = new WordkiDbContext(Options))
            {
                dbContext.Users.Add(Utils.GetUser());
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
                    cardSide1 = new { value = "word1", example = "example1" },
                    cardSide2 = new { value = "word2", example = "example2" },
                    comment = "comment",
                    isVisible = true
                });
            }
            var jsonObj = new
            {
                userId = 1,
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
            long id = long.Parse(message);
            Assert.Greater(id, 0);
        }

        async Task AndThenGroupIsAdded()
        {
            using (var dbContext = new WordkiDbContext(Options))
            {
                var user = await dbContext.Users.Include(u => u.Groups).ThenInclude(g => g.Words).SingleAsync();
                var group = user.Groups.Single();
                Assert.IsNotNull(group);
                Assert.Greater(group.Id, 0);
                Assert.AreEqual(group.User.Id, 1);
                Assert.AreEqual(group.Name, "groupName");
                Assert.AreEqual(group.GroupLanguage1, 1);
                Assert.AreEqual(group.GroupLanguage2, 2);
                Assert.AreEqual(group.GroupCreationDate, Host.TimeProviderMock.Object.Now());

                Assert.AreEqual(2, group.Words.Count);

                foreach (var word in group.Words)
                {
                    Assert.IsNotNull(word);
                    Assert.Greater(word.Id, 0);
                    Assert.AreEqual(group.Id, word.Group.Id);
                    Assert.AreEqual("word1", word.CardSide1.Value);
                    Assert.AreEqual("word2", word.CardSide2.Value);
                    Assert.AreEqual("comment", word.Comment);
                    Assert.AreEqual("example1", word.CardSide1.Example);
                    Assert.AreEqual("example2", word.CardSide2.Example);
                    Assert.AreEqual(0, word.Drawer.Value);
                    Assert.AreEqual(true, word.IsVisible);
                    Assert.AreEqual(Host.TimeProviderMock.Object.Now(), word.NextRepeat);
                    Assert.AreEqual(Host.TimeProviderMock.Object.Now(), word.WordCreationDate);
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
