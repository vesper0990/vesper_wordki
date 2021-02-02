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
using Wordki.Api.Featuers.Group.Add;
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
            using (var dbContext = new WordkiDbContext(ConnectionStringProvider))
            {
                dbContext.Users.Add(Utils.GetUser());
                await dbContext.SaveChangesAsync();
            }
        }

        void AndGivenRequest()
        {
            var words = new List<Wordki.Api.Featuers.Group.Add.Card>();
            for (int i = 0; i < 2; i++)
            {
                words.Add(new Wordki.Api.Featuers.Group.Add.Card
                {
                    Front = new Side
                    {
                        Value = "front-value",
                        Example = "front-example"
                    },
                    Back = new Side
                    {
                        Value = "back-value",
                        Example = "back-example"
                    }
                });
            }
            var jsonObj = new AddGroupCommand
            {
                Name = "groupName",
                LanguageFront = 1,
                LanguageBack = 2,
                Cards = words
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
                var user = await dbContext.Users.Include(u => u.Groups).ThenInclude(g => g.Cards).SingleAsync();
                var group = user.Groups.Single();
                Assert.IsNotNull(group);
                Assert.Greater(group.Id, 0);
                Assert.AreEqual(group.Owner.Id, 1);
                Assert.AreEqual(group.Name, "groupName");
                Assert.AreEqual(group.FrontLanguage, 1);
                Assert.AreEqual(group.BackLanguage, 2);
                Assert.AreEqual(group.CreationDate, Utils.Time);

                Assert.AreEqual(2, group.Cards.Count);

                foreach (var word in group.Cards)
                {
                    Assert.IsNotNull(word);
                    Assert.Greater(word.Id, 0);
                    Assert.AreEqual(group.Id, word.Group.Id);
                    Assert.AreEqual("front-value", word.Front.Value);
                    Assert.AreEqual("back-value", word.Back.Value);
                    Assert.AreEqual("front-example", word.Front.Example);
                    Assert.AreEqual("back-example", word.Back.Example);
                    Assert.AreEqual(Utils.Time, word.CreationDate);
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
