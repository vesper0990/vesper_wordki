using Moq;
using NUnit.Framework;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Wordki.Core;
using System.Net;
using Wordki.Core.Data;

namespace Wordki.Tests.EndToEnd.Register
{
    [TestFixture(typeof(Test1Context))]
    [TestFixture(typeof(Test2Context))]
    [TestFixture(typeof(Test3Context))]
    public class RegisterTest<TContext> where TContext : Context, new()
    {

        private RegisterServerMock server;
        private HttpRequestMessage request;
        private TContext context = new TContext();

        public RegisterTest()
        {
        }

        [SetUp]
        public void Setup()
        {
            server = new RegisterServerMock();
            request = new HttpRequestMessage(HttpMethod.Post, "/register");
            context.Setup(server.UserRepositoryMock);
        }

        [Test]
        public async Task Test_main()
        {
            request.Content = new StringContent(context.GivenMessage, Encoding.UTF8, "application/json");

            var response = await server.Client.SendAsync(request);

            context.Verification(server.UserRepositoryMock);
            Assert.AreEqual(context.ExpectedStatusCode, response.StatusCode);
        }
    }

    public abstract class Context
    {
        public abstract void Setup(Mock<IUserRepository> userRepositoryMock);
        public abstract string GivenMessage { get; }
        public abstract HttpStatusCode ExpectedStatusCode { get; }
        public abstract void Verification(Mock<IUserRepository> userRepositoryMock);
    }

    public class Test1Context : Context
    {
        public override string GivenMessage { get; } = "{\"UserName\":\"kamil\",\"Password\":\"password\",\"PasswordRepeat\":\"password\"}";
        public override HttpStatusCode ExpectedStatusCode { get; } = HttpStatusCode.OK;
        public override void Setup(Mock<IUserRepository> userRepositoryMock)
        {
            userRepositoryMock.Setup(x => x.IsExists("kamil")).Returns(Task.FromResult(false));
            userRepositoryMock.Setup(x => x.SaveAsync(It.IsAny<User>())).Returns(Task.FromResult<long>(1));
        }

        public override void Verification(Mock<IUserRepository> userRepositoryMock)
        {
            userRepositoryMock.Verify(x => x.SaveAsync(
                It.Is<User>(user => user.Name.Equals("kamil") && user.Password.Equals("aaaa"))),
                Times.Once);
        }
    }

    public class Test2Context : Context
    {
        public override string GivenMessage { get; } = "{\"UserName\":\"kamil\",\"Password\":\"password\",\"PasswordRepeat\":\"password\"}";
        public override HttpStatusCode ExpectedStatusCode { get; } = HttpStatusCode.InternalServerError;
        public override void Setup(Mock<IUserRepository> userRepositoryMock)
        {
            userRepositoryMock.Setup(x => x.IsExists("kamil")).Returns(Task.FromResult(true));
            userRepositoryMock.Setup(x => x.SaveAsync(It.IsAny<User>())).Returns(Task.FromResult<long>(1));
        }

        public override void Verification(Mock<IUserRepository> userRepositoryMock)
        {
            userRepositoryMock.Verify(x => x.SaveAsync(
                It.Is<User>(user => user.Name.Equals("kamil"))),
                Times.Never);
        }
    }

    public class Test3Context : Context
    {
        public override string GivenMessage { get; } = "{\"UserName\":\"kamil\",\"Password\":\"password\",\"PasswordRepeat\":\"password2\"}";
        public override HttpStatusCode ExpectedStatusCode { get; } = HttpStatusCode.InternalServerError;
        public override void Setup(Mock<IUserRepository> userRepositoryMock)
        {
            userRepositoryMock.Setup(x => x.IsExists("kamil")).Returns(Task.FromResult(true));
            userRepositoryMock.Setup(x => x.SaveAsync(It.IsAny<User>())).Returns(Task.FromResult<long>(1));
        }

        public override void Verification(Mock<IUserRepository> userRepositoryMock)
        {
            userRepositoryMock.Verify(x => x.SaveAsync(
                It.Is<User>(user => user.Name.Equals("kamil"))),
                Times.Never);
        }
    }
}
