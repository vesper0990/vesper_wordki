using System.Net;
using Wordki.Api.Domain2;
using Wordki.Api.Featuers.Card.Add;

namespace Wordki.Tests.E2E.Feature.CardTests.AddTests
{
    public abstract class AddSuccessContext
    {
        public abstract User GivenEntity { get; }
        public abstract AddCardCommand GivenRequest { get; }
        public HttpStatusCode ExpectedStatusCode => HttpStatusCode.OK;
        public abstract Card ExpectedCard { get; }
    }
}