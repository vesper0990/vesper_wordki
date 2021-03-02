using System.Net;
using Wordki.Api.Domain2;
using Wordki.Api.Featuers.Group.Add;

namespace Wordki.Tests.E2E.Feature.GroupTests.AddTests
{
    public abstract class AddSuccessContext
    {
        public abstract User GivenEntity { get; }
        public abstract AddGroupCommand GivenRequest { get; }

        public abstract HttpStatusCode ExpectedStatusCode { get; }
        public abstract Group ExpectedGroup { get; }
    }
}