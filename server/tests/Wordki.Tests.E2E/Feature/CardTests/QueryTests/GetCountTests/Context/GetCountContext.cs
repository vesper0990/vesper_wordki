namespace Wordki.Tests.E2E.Feature.CardTests.QueryTests.GetCountTests
{
    public abstract class GetCountContext : QueryContext<int>
    {
        public override string GivenUrl => "card/count";
    }
}