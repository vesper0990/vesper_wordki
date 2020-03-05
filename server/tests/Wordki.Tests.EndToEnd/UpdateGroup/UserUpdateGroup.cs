using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using System;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using TestStack.BDDfy;
using Wordki.Core.Dtos;
using Wordki.Tests.EndToEnd.Configuration;

namespace Wordki.Tests.EndToEnd.UpdateGroup
{
    [TestFixture]
    public class UserUpdateGroup : TestBase
    {

        public UserUpdateGroup()
        {
            Request = new HttpRequestMessage(HttpMethod.Put, "/updateGroup");
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

                var word = new WordDto
                {
                    WordId = 1,
                    GroupId = 1,
                    WordLanguage1 = $"word1",
                    WordLanguage2 = $"word2",
                    Drawer = 2,
                    IsVisible = true,
                    WordCreationDate = new DateTime(2020, 01, 01),
                    NextRepeat = new DateTime(2020, 01, 01),
                };
                dbContext.Words.Add(word);
                await dbContext.SaveChangesAsync();
            }
        }

        void AndGivenRequest()
        {
            Request.Content = new StringContent("{\"groupId\":1,\"groupName\":\"group2\",\"language1\":2,\"language2\":1}", Encoding.UTF8, "application/json");
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
            using (var dbContext = new EntityFramework(DapperSettings))
            {
                var group = await dbContext.Groups.SingleOrDefaultAsync();
                Assert.IsNotNull(group);
                Assert.AreEqual(1, group.GroupId);
                Assert.AreEqual("group2", group.Name);
                Assert.AreEqual(2, group.GroupLanguage1);
                Assert.AreEqual(1, group.GroupLanguage2);
            }
        }

        [Test]
        public void Execute()
        {
            this.BDDfy();
        }

    }
}
