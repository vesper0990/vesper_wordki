using Wordki.Api.Domain2;

namespace Wordki.Tests.E2E.Feature.CardTests.QueryTests.GetCountTests
{
    public class NoCards : GetCountContext
    {
        public override User GivenEntity { get; }
        public override int ExpectedResponse => 0;

        public NoCards()
        {
            GivenEntity = Utils.GetUser();
        }
    }
}