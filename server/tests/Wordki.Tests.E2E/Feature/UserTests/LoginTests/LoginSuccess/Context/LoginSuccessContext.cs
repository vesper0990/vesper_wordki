using System.Net;
using Wordki.Api.Domain2;
using Wordki.Api.Featuers.User.Login;

namespace Wordki.Tests.E2E.Feature.UserTests.LoginTests
{
    public abstract class LoginSuccessContext
    {
        public abstract User GivenEntity { get; }
        public abstract LoginCommnad GivenContent { get; }
        public abstract HttpStatusCode ExpectedStatusCode { get; }
        public abstract string ExpectedResponseMessage { get; }
        public abstract User ExpectedEntity { get; }
    }
}