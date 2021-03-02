using Wordki.Api.Domain2;
using Wordki.Api.Featuers.Card.Update;

namespace Wordki.Tests.E2E.Feature.CardTests.UpdateTests
{
    public abstract class UpdateSuccessContext
    {
        public abstract User GivenEntity { get; }
        public abstract UpdateCardCommand GivenRequest { get; }
        public abstract Card ExpectedCard { get; }
    }
}
