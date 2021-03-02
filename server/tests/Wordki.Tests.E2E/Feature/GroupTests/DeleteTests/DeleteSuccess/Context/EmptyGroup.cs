using System.Net;
using Wordki.Api.Domain2;

namespace Wordki.Tests.E2E.Feature.GroupTests.DeleteTests
{
    public class EmptyGroup : DeleteSuccessContext
    {
        public override User GivenEntity { get; }

        public override long GivenId => 1;

        public override HttpStatusCode ExpectedStatusCode => HttpStatusCode.OK;

        public EmptyGroup()
        {
            GivenEntity = Utils.GetUser();
            GivenEntity.AddGroup(new Group
            {
                Name = "name",
                BackLanguage = 1,
                FrontLanguage = 2
            });
        }
    }
}