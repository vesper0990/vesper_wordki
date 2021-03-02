using System.Net;
using Wordki.Api.Domain2;

namespace Wordki.Tests.E2E.Feature.GroupTests.DeleteTests
{
    public abstract class DeleteSuccessContext
    {
        public abstract User GivenEntity { get; }
        public abstract long GivenId { get; }
        public abstract HttpStatusCode ExpectedStatusCode { get; }
    }
}