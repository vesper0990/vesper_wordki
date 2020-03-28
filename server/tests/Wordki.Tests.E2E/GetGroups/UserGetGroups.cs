using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using NUnit.Framework;
using TestStack.BDDfy;
using Wordki.Core.Dtos;
using Wordki.Tests.EndToEnd.Configuration;

namespace Wordki.Tests.EndToEnd.GetGroups
{
    [TestFixture]
    public class UserGetGroups : TestBase
    {
        public UserGetGroups()
        {
            Request = new HttpRequestMessage(HttpMethod.Get, "/getGroups");
        }

        async Task GivenDataInDatabase()
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

        async Task WhenRequestReceived() => await SendRequest();

        void ThenResponseIsOk()
        {
            Assert.AreEqual(HttpStatusCode.OK, Response.StatusCode);
        }

        async Task AndThenResponseContainMessage()
        {
            var message = await Response.Content.ReadAsStringAsync();
            Assert.AreEqual("[{\"id\":1,\"name\":\"group\",\"language1\":1,\"language2\":2,\"wordsCount\":0,\"repeatsCount\":0,\"averageDrawer\":0}]", message);
        }

        [Test]
        public void Execute()
        {
            this.BDDfy();
        }

    }
}