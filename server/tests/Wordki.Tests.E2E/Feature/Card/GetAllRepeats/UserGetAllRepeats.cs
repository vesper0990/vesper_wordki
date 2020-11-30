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

namespace Wordki.Tests.E2E.Feature.Card.GetAllRepeats
{
    [TestFixture]
    public class UserGetAllRepeats : TestBase
    {
        private Api.Domain.Card card;
        public UserGetAllRepeats()
        {
            Request = new HttpRequestMessage(HttpMethod.Get, "/card/allRepeats");
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

                card = Utils.GetCard();
                card.Group = group;
                card.Heads.State.NextRepeat = Utils.Tommorow;
                card.Tails.State.NextRepeat = Utils.Yesterday;

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
            var obj = JsonSerializer.Deserialize<IEnumerable<RepeatDto>>(message, new JsonSerializerOptions() { PropertyNameCaseInsensitive = true });
            var expectation = new List<RepeatDto>();

            expectation.Add(card.ConvertIntoRepeatDto(true));

            Assert.AreEqual(JsonSerializer.Serialize(expectation), JsonSerializer.Serialize(obj));
        }

        [Test]
        public void Execute()
        {
            this.BDDfy();
        }
    }
}
