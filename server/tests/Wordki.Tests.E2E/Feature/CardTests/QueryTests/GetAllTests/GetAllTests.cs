using System.Collections.Generic;
using System.Threading.Tasks;
using NUnit.Framework;
using Wordki.Api.Responses;

namespace Wordki.Tests.E2E.Feature.CardTests.QueryTests.GetAllTests
{
    [TestFixture]
    public class GetAllTests<TContext> : QueryTests<TContext, IEnumerable<CardDetailsDto>> where TContext : GetAllContext, new()
    {
        public async Task Test() => await TestBase();
    }
}