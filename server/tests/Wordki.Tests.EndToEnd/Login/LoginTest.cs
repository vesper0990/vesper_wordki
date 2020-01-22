using Moq;
using NUnit.Framework;
using System;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Wordki.Core;

namespace Wordki.Tests.EndToEnd.Login
{
    [TestFixture]
    public class LoginTest
    {
        private LoginServerMock server;
        private HttpRequestMessage request;

        [SetUp]
        public void Setup()
        {
            server = new LoginServerMock();
            request = new HttpRequestMessage(HttpMethod.Post, "/login");
        }

        [Test]
        public async Task Return_ok_when_user_exists()
        {
            server.UserRepositoryMock.Setup(x => x.GetUserAsync("kamil", "aaaa")).Returns(Task.FromResult(server.CreateUser()));
            server.UserRepositoryMock.Setup(x => x.SaveAsync(It.IsAny<User>())).Returns(Task.FromResult<long>(1));

            var message = "{\"UserName\":\"kamil\",\"Password\":\"password\"}";
            request.Content = new StringContent(message, Encoding.UTF8, "application/json");

            var response = await server.Client.SendAsync(request);

            server.UserRepositoryMock.Verify(x => x.SaveAsync(
                It.Is<User>(user => user.Name.Equals("kamil") &&
                user.Password.Equals("aaaa") &&
                user.LastLoginDate.Value.Equals(new DateTime(1990, 9, 24)))),
                Times.Once);
            Assert.AreEqual(response.StatusCode, HttpStatusCode.OK);
        }
    }
}
