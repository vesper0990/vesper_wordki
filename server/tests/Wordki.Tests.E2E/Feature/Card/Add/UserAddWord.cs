using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
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
            Request = new HttpRequestMessage(HttpMethod.Post, "/card/add");
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
                await dbContext.SaveChangesAsync();
            }
        }

        void AndGivenRequest()
        {
            var content = new
            {
                groupId = 1,
                front = new { value = "word1", example = "example1" },
                back = new { value = "word2", example = "example2" },
                isVisible = true
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
            var id = long.Parse(message);
            Assert.Greater(id, 0);
        }

        async Task AndThenWordIsAdded()
        {
            using (var dbContext = new WordkiDbContext(ConnectionStringProvider))
            {
                var word = await dbContext.Cards.Include(w => w.Group).SingleOrDefaultAsync();
                Assert.IsNotNull(word);
                Assert.Greater(word.Id, 0);
                Assert.AreEqual(1, word.Group.Id);
                Assert.AreEqual("word1", word.Front.Value);
                Assert.AreEqual("word2", word.Back.Value);
                Assert.AreEqual("example1", word.Front.Example);
                Assert.AreEqual("example2", word.Back.Example);
                Assert.AreEqual(0, word.Front.State.Drawer.Value);
                Assert.AreEqual(0, word.Back.State.Drawer.Value);
                Assert.AreEqual(Utils.Now, word.CreationDate);
            }
        }

        [Test]
        public void Execute()
        {
            this.BDDfy();
        }
    }
}
