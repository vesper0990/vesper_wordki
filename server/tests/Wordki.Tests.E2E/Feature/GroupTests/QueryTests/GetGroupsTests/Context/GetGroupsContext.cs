using System.Collections.Generic;
using Wordki.Api.Responses;

namespace Wordki.Tests.E2E.Feature.GroupTests.QueryTests.GetGroupsTests
{
    public abstract class GetGroupsContext : QueryContext<IEnumerable<GroupDto>>
    {
        public override string GivenUrl => "group/all";
    }
}