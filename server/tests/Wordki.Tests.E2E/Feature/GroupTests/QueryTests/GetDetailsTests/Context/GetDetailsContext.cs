using Wordki.Api.Responses;

namespace Wordki.Tests.E2E.Feature.GroupTests.QueryTests.GetDetailsTests
{
    public abstract class GetDetailsContext : QueryContext<GroupDetailsDto>
    {
        public override string GivenUrl => "group/details/1";
    }
}