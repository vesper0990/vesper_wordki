using System;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using TestStack.BDDfy;
using Wordki.Core.Dtos;
using Wordki.Tests.EndToEnd.Configuration;

namespace Wordki.Tests.EndToEnd.AddRepeat
{
    [TestFixture]
    public class UserAddAcceptedRepeat : TestBase
    {
        public UserAddAcceptedRepeat()
        {
            Request = new HttpRequestMessage(HttpMethod.Post, "/addRepeat");
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

                var word = new WordDto
                {
                    WordId = 1,
                    GroupId = 1,
                    WordLanguage1 = $"word",
                    WordLanguage2 = $"word",
                    Drawer = 2,
                    WordCreationDate = new DateTime(2020, 01, 01),
                    NextRepeat = new DateTime(2020, 01, 01),
                };
                dbContext.Words.Add(word);
                await dbContext.SaveChangesAsync();
            }
        }

        void AndGivenRequest()
        {
            Request.Content = new StringContent("{\"wordId\":1,\"result\":1}", Encoding.UTF8, "application/json");
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

        async Task AndThenRepeatIsAdded()
        {
            using (var dbContext = new EntityFramework(DapperSettings))
            {
                var repeat = await dbContext.Repeats.SingleOrDefaultAsync();
                Assert.IsNotNull(repeat);
                Assert.Greater(repeat.Id, 0);
                Assert.AreEqual(1, repeat.Result);
                Assert.AreEqual(1, repeat.WordId);
                Assert.AreEqual(Host.TimeProviderMock.Object.GetTime(), repeat.DateTime);
            }
        }

        async Task AndThenWordIsUpdated()
        {
            using (var dbContext = new EntityFramework(DapperSettings))
            {
                var word = await dbContext.Words.SingleOrDefaultAsync();
                Assert.IsNotNull(word);
                Assert.AreEqual(1, word.GroupId);
                Assert.AreEqual(1, word.WordId);
                Assert.AreEqual(Host.TimeProviderMock.Object.GetTime().AddDays(3), word.NextRepeat);
                Assert.AreEqual(3, word.Drawer);
            }
        }

        [Test]
        public void Execute()
        {
            this.BDDfy();
        }
    }
}