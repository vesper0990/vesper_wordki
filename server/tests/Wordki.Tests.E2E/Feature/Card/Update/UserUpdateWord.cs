using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using TestStack.BDDfy;
using Wordki.Api.Featuers.Card.Update;
using Wordki.Api.Repositories.EntityFrameworkRepositories;

namespace Wordki.Tests.E2E.Feature.Card.Update
{
    [TestFixture]
    public class UserUpdateCard : TestBase
    {

        public UserUpdateCard()
        {
            Request = new HttpRequestMessage(HttpMethod.Put, "/card/update");
        }

        async Task GivenGroupInDatabase()
        {
            using (var dbContext = new WordkiDbContext(ConnectionStringProvider))
            {
                var user = Utils.GetUser();
                dbContext.Users.Add(user);

                var group = Utils.GetGroup();
                group.User = user;

                dbContext.Groups.Add(group);

                var word = Utils.GetCard();
                word.Group = group;

                dbContext.Words.Add(word);
                await dbContext.SaveChangesAsync();
            }
        }

        void AndGivenRequest()
        {
            var content = new UpdateCardCommand
            {
                Id = 1,
                Front = new Side { Value = "heads123", Example = "example123" },
                Back = new Side { Value = "tails123", Example = "example456" },
                IsVisible = false
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
                var word = await dbContext.Words.Include(w => w.Group).SingleOrDefaultAsync();
                Assert.IsNotNull(word);
                Assert.AreEqual(1, word.Id);
                Assert.AreEqual(1, word.Group.Id);
                Assert.AreEqual("heads123", word.Heads.Value);
                Assert.AreEqual("example123", word.Heads.Example);
                Assert.AreEqual(2, word.Heads.State.Drawer.Value);
                Assert.AreEqual("tails123", word.Tails.Value);
                Assert.AreEqual("example456", word.Tails.Example);
                Assert.AreEqual(2, word.Tails.State.Drawer.Value);
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
