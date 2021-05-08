using Wordki.Api.Domain2;

namespace Wordki.Tests.E2E.Feature.CardTests.QueryTests.GetCountTests
{
    public class SingleCardOneSideRepeat : GetCountContext
    {
        public override User GivenEntity { get; }
        public override int ExpectedResponse => 1;

        public SingleCardOneSideRepeat()
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
            card.FrontDetails.NextRepeatDate = DateTimeMock.Tomorrow;
            group.AddCard(card);
            GivenEntity.AddGroup(group);
        }
    }
}