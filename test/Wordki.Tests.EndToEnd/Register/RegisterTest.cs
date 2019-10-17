using Moq;
using NUnit.Framework;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Wordki.Core;
using System.Net;

namespace Wordki.Tests.EndToEnd.Register
{
    [TestFixture]
    public class RegisterTest
    {

        private RegisterServerMock server;
        private HttpRequestMessage request;

        [SetUp]
        public void Setup()
        {
            server = new RegisterServerMock();
            request = new HttpRequestMessage(HttpMethod.Post, "/register");
        }

        [Test]
        public async Task Return_ok_when_user_not_exist()
        {
            server.UserRepositoryMock.Setup(x => x.IsExists("kamil")).Returns(Task.FromResult(false));
            server.UserRepositoryMock.Setup(x => x.SaveAsync(It.IsAny<User>())).Returns(Task.CompletedTask);

            var message = "{\"UserName\":\"kamil\",\"Password\":\"password\",\"PasswordRepeat\":\"password\"}";
            request.Content = new StringContent(message, Encoding.UTF8, "application/json");

            var response = await server.Client.SendAsync(request);

            server.UserRepositoryMock.Verify(x => x.SaveAsync(
                It.Is<User>(user => user.Name.Equals("kamil") && user.Password.Equals("aaaa"))),
                Times.Once); 
            Assert.AreEqual(response.StatusCode, HttpStatusCode.OK);
        }

        [Test]
        public async Task Return_Error_when_user_exists()
        {
            server.UserRepositoryMock.Setup(x => x.IsExists("kamil")).Returns(Task.FromResult(true));

            var message = "{\"UserName\":\"kamil\",\"Password\":\"password\",\"PasswordRepeat\":\"password\"}";
            request.Content = new StringContent(message, Encoding.UTF8, "application/json");

            var response = await server.Client.SendAsync(request);

            server.UserRepositoryMock.Verify(x => x.SaveAsync(
                It.Is<User>(user => user.Name.Equals("kamil"))),
                Times.Never);
            Assert.AreEqual(response.StatusCode, HttpStatusCode.InternalServerError);
        }

        [Test]
        public async Task Return_Error_when_passwords_are_not_same()
        {
            server.UserRepositoryMock.Setup(x => x.IsExists("kamil")).Returns(Task.FromResult(true));

            var message = "{\"UserName\":\"kamil\",\"Password\":\"password\",\"PasswordRepeat\":\"password2\"}";
            request.Content = new StringContent(message, Encoding.UTF8, "application/json");

            var response = await server.Client.SendAsync(request);

            server.UserRepositoryMock.Verify(x => x.SaveAsync(
                It.Is<User>(user => user.Name.Equals("kamil"))),
                Times.Never);
            Assert.AreEqual(response.StatusCode, HttpStatusCode.InternalServerError);
        }
    }
}
