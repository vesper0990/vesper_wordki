using System.Net;
using Wordki.Api.Domain2;
using Wordki.Api.Featuers.User.Register;
using Wordki.Infrastructure.Framework.ExceptionMiddleware;

namespace Wordki.Tests.E2E.Feature.UserTests.RegisterTests
{
    public class UserExists : RegisterFailedContext
    {
        public override User GivenEntity => Utils.GetUser();

        public override RegisterCommand GivenRequest => new RegisterCommand
        {
            UserName = GivenEntity.Name,
            Password = "Password",
            PasswordConfirmation = "Password"
        };

        public override HttpStatusCode ExpectedStatusCode => HttpStatusCode.BadRequest;

        public override ApiError ExpectedResponse => new ApiError
        {
            Code = ErrorCode.RegisterUserAlreadyExists.ToString(),
            Message = "User already exists"
        };
    }
}