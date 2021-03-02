using System.Net;
using Wordki.Api.Featuers.User.Login;
using Wordki.Infrastructure.Framework.ExceptionMiddleware;

namespace Wordki.Tests.E2E.Feature.UserTests.LoginTests
{
    public class UserDoesNotExist : LoginFailedContext
    {
        public override LoginCommnad GivenContent => new LoginCommnad
        {
            UserName = "UserName",
            Password = "Password"
        };

        public override HttpStatusCode ExpectedStatusCode => HttpStatusCode.BadRequest;

        public override ApiError ExpectedResponse => new ApiError
        {
            Code = ErrorCode.LoginUserNotFound.ToString(),
            Message = "User is not found"
        };

    }

}