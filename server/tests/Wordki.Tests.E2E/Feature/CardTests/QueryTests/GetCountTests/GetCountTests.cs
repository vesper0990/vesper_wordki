using System.Threading.Tasks;
using NUnit.Framework;

namespace Wordki.Tests.E2E.Feature.CardTests.QueryTests.GetCountTests
{
    [TestFixture(typeof(NoCards))]
    [TestFixture(typeof(SingleCardNoRepeats))]
    [TestFixture(typeof(SingleCardOneSideRepeat))]
    [TestFixture(typeof(SingleCardTwoSidesRepeats))]
    public class GetCountTests<TContext> : QueryTests<TContext, int> where TContext : GetCountContext, new()
    {
        public async Task Test() => await TestBase();
    }
}