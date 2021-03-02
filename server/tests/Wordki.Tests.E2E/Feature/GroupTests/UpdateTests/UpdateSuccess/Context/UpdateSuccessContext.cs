using System.Net;
using Wordki.Api.Domain2;
using Wordki.Api.Featuers.Group.Update;

namespace Wordki.Tests.E2E.Feature.GroupTests.UpdateTests
{
    public abstract class UpdateSuccessContext
    {
        public abstract User GivenEntity { get; }
        public abstract UpdateGroupCommand GivenRequest { get; }
        public abstract HttpStatusCode ExpectedStatusCode { get; }
        public abstract Group ExpectedGroup { get; }
    }
}