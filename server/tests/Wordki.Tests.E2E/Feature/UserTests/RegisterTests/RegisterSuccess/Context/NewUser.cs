using System.Net;
using Wordki.Api.Featuers.User.Register;
using Wordki.Api.Domain2;

namespace Wordki.Tests.E2E.Feature.UserTests.RegisterTests
{
    public class NewUser : RegisterSuccessContext
    {
        public override RegisterCommand GivenRequest =>
        new RegisterCommand
        {
            UserName = "test-user-name",
            Password = "Password",
            PasswordConfirmation = "Password"
        };

        public override HttpStatusCode ExpectedStatusCode => HttpStatusCode.OK;

        public override User ExpectedEntity => new User
        {
            Name = GivenRequest.UserName,
            Password = "PasswordHash",
            CreationDate = DateTimeMock.Now,
            LastLoginDate = new System.DateTime()
        };
    }

}