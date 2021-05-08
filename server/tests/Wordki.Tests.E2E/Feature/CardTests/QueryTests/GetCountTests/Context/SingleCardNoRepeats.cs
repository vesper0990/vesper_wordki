using Wordki.Api.Domain2;

namespace Wordki.Tests.E2E.Feature.CardTests.QueryTests.GetCountTests
{
    public class SingleCardNoRepeats : GetCountContext
    {
        public override User GivenEntity { get; }
        public override int ExpectedResponse => 0;

        public SingleCardNoRepeats()
        {
            GivenEntity = Utils.GetUser();
            var group = new Group
            {
                Id = 1,
                BackLanguage = 1,
                FrontLanguage = 2,
                Name = "test-group"
            };
            var factory = new CardFactory();
            var card = factory.Create("front-value", "back-value", "front-example", "back-example");
            card.Id = 1;
            group.AddCard(card);
            GivenEntity.AddGroup(group);
        }
    }
}