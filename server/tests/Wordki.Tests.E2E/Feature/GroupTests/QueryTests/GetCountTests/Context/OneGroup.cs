using Wordki.Api.Domain2;

namespace Wordki.Tests.E2E.Feature.GroupTests.QueryTests.GetCountTests
{
    public class OneGroup : GetCountContext
    {
        public override User GivenEntity { get; }
        public override int ExpectedResponse => 1;

        public OneGroup()
        {
            GivenEntity = Utils.GetUser();
            GivenEntity.AddGroup(new Group());
        }
    }


}