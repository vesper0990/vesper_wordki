using System.Net;
using Wordki.Api.Domain2;
using Wordki.Api.Featuers.User.Login;

namespace Wordki.Tests.E2E.Feature.UserTests.LoginTests
{
    public class UserExists : LoginSuccessContext
    {
        public override User GivenEntity => Utils.GetUser();
        public override LoginCommnad GivenContent => new LoginCommnad
        {
            UserName = GivenEntity.Name,
            Password = "Password"
        };
        public override HttpStatusCode ExpectedStatusCode => HttpStatusCode.OK;
        public override string ExpectedResponseMessage => "test-token";
        public override User ExpectedEntity { get; }

        public UserExists()
        {
            ExpectedEntity = Utils.GetUser();
            ExpectedEntity.LastLoginDate = DateTimeMock.Now;
        }
    }

}