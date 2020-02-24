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

namespace Wordki.Tests.EndToEnd.Login
{
    [TestFixture]
    public class UserCanLogin : TestBase
    {
        public UserCanLogin()
        {
            Request = new HttpRequestMessage(HttpMethod.Post, "/login");
        }

        async Task GivenUserInDatabase()
        {
            var user = new UserDto
            {
                Id = 1,
                Name = "user",
                Password = Host.EncrypterMock.Object.Md5Hash(string.Empty),
                CreationDate = new DateTime(2000, 1, 1),
                LastLoginDate = new DateTime(2000, 1, 2)
            };
            using(var dbContext = new EntityFramework())
            {
                dbContext.Users.Add(user);
                await dbContext.SaveChangesAsync();
            }
        }

        void AndGivenRequest()
        {
            Request.Content = new StringContent("{\"name\":\"user\", \"password\":\"pass\"}", Encoding.UTF8, "application/json");
        }

        async Task WhenRequestReceived() => await SendRequest();

        void ThenResponseIsOk()
        {
            Assert.AreEqual(HttpStatusCode.OK, Response.StatusCode);
        }

        async Task AndThenResponseIsEmpty()
        {
            var content = await Response.Content.ReadAsStringAsync();
            Assert.IsEmpty(content);
        }

        async Task AndThenLoginTimeIsSetInDatabase()
        {
            using(var dbContext = new EntityFramework())
            {
                var user = await dbContext.Users.SingleAsync();
                Assert.AreEqual(1, user.Id);
                Assert.AreEqual("user", user.Name);
                Assert.AreEqual(Host.EncrypterMock.Object.Md5Hash(string.Empty), user.Password);
                Assert.AreEqual(Host.TimeProviderMock.Object.GetTime(), user.LastLoginDate);
                Assert.AreEqual(new DateTime(2000, 1, 1), user.CreationDate);
            }
        }

        [Test]
        public void Execute()
        {
            this.BDDfy();
        }
    }
}
