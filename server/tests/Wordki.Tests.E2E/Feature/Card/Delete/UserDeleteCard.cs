using System;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using TestStack.BDDfy;
using Wordki.Api.Repositories.EntityFrameworkRepositories;

namespace Wordki.Tests.E2E.Feature.Delete
{
    [TestFixture]
    public class UserDeleteCard : TestBase
    {

        public UserDeleteCard()
        {
            Request = new HttpRequestMessage(HttpMethod.Delete, "/card/delete/1");
        }

        async Task GivenGroupInDatabase()
        {
            using (var dbContext = new WordkiDbContext(ConnectionStringProvider))
            {
                var user = Utils.GetUser();
                dbContext.Users.Add(user);

                var group = Utils.GetGroup();
                group.Owner = user;

                dbContext.Groups.Add(group);

                var word = Utils.GetCard();
                word.Group = group;

                dbContext.Cards.Add(word);
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

        async Task AndThenWordIsAdded()
        {
            using (var dbContext = new WordkiDbContext(ConnectionStringProvider))
            {
                var counts = await dbContext.Cards.CountAsync();
                Assert.AreEqual(0, counts);
            }
        }

        [Test]
        public void Execute()
        {
            this.BDDfy();
        }
    }
}