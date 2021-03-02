using System.Net;
using Wordki.Api.Featuers.User.Register;
using Wordki.Api.Domain2;

namespace Wordki.Tests.E2E.Feature.UserTests.RegisterTests
{
    public abstract class RegisterSuccessContext
    {
        public abstract RegisterCommand GivenRequest { get; }
        public abstract HttpStatusCode ExpectedStatusCode { get; }
        public abstract User ExpectedEntity { get; }
    }

}