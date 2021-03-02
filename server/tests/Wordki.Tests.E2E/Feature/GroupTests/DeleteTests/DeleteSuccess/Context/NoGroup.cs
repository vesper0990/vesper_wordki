using System.Net;
using Wordki.Api.Domain2;

namespace Wordki.Tests.E2E.Feature.GroupTests.DeleteTests
{
    public class NoGroup : DeleteSuccessContext
    {
        public override User GivenEntity => Utils.GetUser();

        public override long GivenId => 1;

        public override HttpStatusCode ExpectedStatusCode => HttpStatusCode.OK;
    }
}