using System.Collections.Generic;
using Wordki.Api.Domain2;
using Wordki.Api.Responses;

namespace Wordki.Tests.E2E.Feature.CardTests.QueryTests.GetAllTests
{
    public class NoCards : GetAllContext
    {
        public override User GivenEntity { get; }
        public override IEnumerable<CardDetailsDto> ExpectedResponse { get; }
        public NoCards()
        {
            GivenEntity = Utils.GetUser();
            ExpectedResponse = new CardDetailsDto[0];
        }
    }
}