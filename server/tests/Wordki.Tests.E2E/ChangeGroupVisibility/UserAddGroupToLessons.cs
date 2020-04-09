using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using TestStack.BDDfy;
using Wordki.Core.Dtos;
using Wordki.Tests.EndToEnd.Configuration;

namespace Wordki.Tests.E2E.ChangeGroupVisibility
{
    [TestFixture]
    public class UserAddGroupToLessons : TestBase
    {

        public UserAddGroupToLessons()
        {
            Request = new HttpRequestMessage(HttpMethod.Put, "/changeGroupVisibility");
        }

        async Task GivenGroupInDatabase()
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

                for (var i = 1; i < 5; i++)
                {
                    var word = new WordDto
                    {
                        WordId = i,
                        GroupId = 1,
                        IsVisible = false,
                    };
                    dbContext.Words.Add(word);
                }
                await dbContext.SaveChangesAsync();
            }
        }

        void AndGivenRequest()
        {
            var requestObj = new
            {
                id = 1,
                isAddedToLessons = true
            };
            var requestJson = JsonSerializer.Serialize(requestObj);
            Request.Content = new StringContent(requestJson, Encoding.UTF8, "application/json");
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

        async Task AndThenWordsShouldBeVisible()
        {
            using (var dbContext = new EntityFramework(DapperSettings))
            {
                var words = await dbContext.Words.ToArrayAsync();
                Assert.AreEqual(4, words.Length);
                foreach (var word in words)
                {
                    Assert.True(word.IsVisible);
                }
            }
        }

        [Test]
        public void Execute()
        {
            this.BDDfy();
        }
    }
}
