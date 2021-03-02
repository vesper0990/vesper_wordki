using System.Net;
using Wordki.Api.Featuers.User.Login;
using Wordki.Infrastructure.Framework.ExceptionMiddleware;

namespace Wordki.Tests.E2E.Feature.UserTests.LoginTests
{
    public abstract class LoginFailedContext
    {
        public abstract LoginCommnad GivenContent { get; }
        public abstract HttpStatusCode ExpectedStatusCode { get; }
        public abstract ApiError ExpectedResponse { get; }
    }
}