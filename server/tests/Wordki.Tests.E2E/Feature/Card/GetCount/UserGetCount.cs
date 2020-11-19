using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using TestStack.BDDfy;
using Wordki.Api.Featuers.Card.GetAllRepeat;
using Wordki.Api.Repositories.EntityFrameworkRepositories;

namespace Wordki.Tests.E2E.Feature.Card.GetCount
{
    [TestFixture]
    public class UserGetCount : TestBase
    {
        public UserGetCount()
        {
            Request = new HttpRequestMessage(HttpMethod.Get, "/card/count");
        }

        async Task GivenDatabaseContainData()
        {
            using (var dbContext = new WordkiDbContext(ConnectionStringProvider))
            {
                var user = Utils.GetUser();
                dbContext.Users.Add(user);

                var group = Utils.GetGroup();
                group.User = user;
                dbContext.Groups.Add(group);

                var card = Utils.GetCard();
                card.Group = group;

                await dbContext.Words.AddAsync(card);

                await dbContext.SaveChangesAsync();
            }
        }

        async Task WhenRequestReceived() => await SendRequest();

        void ThenResponseIsOk()
        {
            Assert.AreEqual(HttpStatusCode.OK, Response.StatusCode);
        }

        async Task AndThenResponseContainProperMessage()
        {
            var message = await Response.Content.ReadAsStringAsync();
            int count = Int32.Parse(message);
            Assert.AreEqual(1, count);
        }

        [Test]
        public void Execute()
        {
            this.BDDfy();
        }
    }
}
