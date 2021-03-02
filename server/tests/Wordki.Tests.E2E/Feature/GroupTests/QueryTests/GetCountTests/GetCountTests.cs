using System.Threading.Tasks;
using NUnit.Framework;

namespace Wordki.Tests.E2E.Feature.GroupTests.QueryTests.GetCountTests
{
    [TestFixture(typeof(NoGroup))]
    [TestFixture(typeof(OneGroup))]
    [TestFixture(typeof(MultipleGroup))]
    public class GetCountTests<TContext> : QueryTests<TContext, int> where TContext : GetCountContext, new()
    {
        [Test]
        public async Task Test() => await TestBase();
    }
}