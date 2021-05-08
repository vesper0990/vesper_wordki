using Wordki.Api.Domain2;

namespace Wordki.Tests.E2E.Feature.CardTests.DeleteTests
{
    public class EmptyCard : DeleteSuccessContext
    {
        public override User GivenEntity { get; }
        public override long GivenId => 1;
        public override long GivenGroupId => 1;

        public EmptyCard()
        {
            GivenEntity = Utils.GetUser();
            var group = new Group
            {
                Name = "test-group",
                FrontLanguage = 1,
                BackLanguage = 2
            };
            group.AddCard(new Card());
            GivenEntity.AddGroup(group);
        }
    }
}