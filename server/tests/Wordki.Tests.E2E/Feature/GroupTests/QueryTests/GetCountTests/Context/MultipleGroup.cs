using Wordki.Api.Domain2;

namespace Wordki.Tests.E2E.Feature.GroupTests.QueryTests.GetCountTests
{
    public class MultipleGroup : GetCountContext
    {
        public override User GivenEntity { get; }
        public override int ExpectedResponse => 2;

        public MultipleGroup()
        {
            GivenEntity = Utils.GetUser();
            GivenEntity.AddGroup(new Group());
            GivenEntity.AddGroup(new Group());
        }
    }


}