namespace Wordki.Tests.E2E.Feature.GroupTests.QueryTests.GetCountTests
{
    public abstract class GetCountContext : QueryContext<int>
    {
        public override string GivenUrl => "group/count";
    }


}