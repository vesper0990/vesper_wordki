using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using TestStack.BDDfy;
using Wordki.Api.Repositories.EntityFrameworkRepositories;

namespace Wordki.Tests.E2E.Feature.User.Register
{
    [TestFixture]
    public class UserCanBeRegistrated : TestBase
    {

        public UserCanBeRegistrated()
        {
            Request = new HttpRequestMessage(HttpMethod.Post, "/user/register");
        }

        void GivenRequest()
        {
            Request.Content = new StringContent("{\"userName\":\"user\", \"password\":\"pass\", \"passwordRepeat\":\"pass\"}", Encoding.UTF8, "application/json");
        }

        async Task WhenRequestReceived() => await SendRequest();

        void ThenResponseIsOk()
        {
            Assert.AreEqual(HttpStatusCode.OK, Response.StatusCode);
        }

        async Task AndThenResponseIsEmpty()
        {
            var responseContent = await Response.Content.ReadAsStringAsync();
            Assert.AreEqual(string.Empty, responseContent);
        }

        async Task AndThenUserAdded()
        {
            using (var dbContext = new WordkiDbContext(Options))
            {
                var user = await dbContext.Users.SingleAsync();
                Assert.AreEqual("user", user.Name);
                Assert.Greater(user.Id, 0);
                Assert.AreEqual(Host.EncrypterMock.Object.Md5Hash("pass"), user.Password);
                Assert.IsNull(user.LastLoginDate);
                Assert.AreEqual(Host.TimeProviderMock.Object.Now(), user.CreationDate);
            }
        }

        [Test]
        public void Execute()
        {
            this.BDDfy();
        }
    }
}
