using System.Net;
using Wordki.Api.Domain2;
using Wordki.Api.Featuers.User.Register;
using Wordki.Infrastructure.Framework.ExceptionMiddleware;

namespace Wordki.Tests.E2E.Feature.UserTests.RegisterTests
{
    public abstract class RegisterFailedContext
    {
        public abstract User GivenEntity { get; }
        public abstract RegisterCommand GivenRequest { get; }
        public abstract HttpStatusCode ExpectedStatusCode { get; }
        public abstract ApiError ExpectedResponse { get; }
    }
}