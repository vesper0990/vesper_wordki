using Wordki.Api.Domain2;

namespace Wordki.Tests.E2E.Feature.GroupTests.QueryTests.GetCountTests
{
    public class NoGroup : GetCountContext
    {
        public override User GivenEntity => Utils.GetUser();
        public override int ExpectedResponse => 0;
    }


}