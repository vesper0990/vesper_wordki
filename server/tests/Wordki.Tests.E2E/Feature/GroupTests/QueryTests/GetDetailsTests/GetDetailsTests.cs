using System.Threading.Tasks;
using NUnit.Framework;
using Wordki.Api.Responses;

namespace Wordki.Tests.E2E.Feature.GroupTests.QueryTests.GetDetailsTests
{
    [TestFixture(typeof(EmptyGroup))]
    [TestFixture(typeof(UsedGroup))]
    public class GetDetailsTests<TContext> : QueryTests<TContext, GroupDetailsDto> where TContext : QueryContext<GroupDetailsDto>, new()
    {
        [Test]
        public async Task Test() => await TestBase();
    }
}