using System.Collections.Generic;
using Wordki.Api.Responses;

namespace Wordki.Tests.E2E.Feature.CardTests.QueryTests.GetAllTests
{
    public abstract class GetAllContext : QueryContext<IEnumerable<CardDetailsDto>>
    {
        public override string GivenUrl => "card/all/1";
    }
}