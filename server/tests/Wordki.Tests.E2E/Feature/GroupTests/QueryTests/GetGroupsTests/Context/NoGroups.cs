using System.Collections.Generic;
using Wordki.Api.Domain2;
using Wordki.Api.Responses;

namespace Wordki.Tests.E2E.Feature.GroupTests.QueryTests.GetGroupsTests
{
    public class NoGroups : GetGroupsContext
    {
        public override User GivenEntity => Utils.GetUser();
        public override IEnumerable<GroupDto> ExpectedResponse => new GroupDto[0];
    }
}