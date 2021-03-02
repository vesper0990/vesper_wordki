using System.Collections.Generic;
using System.Threading.Tasks;
using NUnit.Framework;
using Wordki.Api.Responses;

namespace Wordki.Tests.E2E.Feature.GroupTests.QueryTests.GetGroupsTests
{
    [TestFixture(typeof(NoGroups))]
    [TestFixture(typeof(EmptyGroup))]
    public class GetGroupsTests<TContext> : QueryTests<TContext, IEnumerable<GroupDto>>
     where TContext : QueryContext<IEnumerable<GroupDto>>, new()
    {
        [Test]
        public async Task Test() => await TestBase();
    }
}