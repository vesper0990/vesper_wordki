using Wordki.Api.Domain2;
using Wordki.Api.Featuers.Card.Update;

namespace Wordki.Tests.E2E.Feature.CardTests.UpdateTests
{
    public class SingleCard : UpdateSuccessContext
    {
        public override User GivenEntity { get; }
        public override UpdateCardCommand GivenRequest { get; }
        public override Card ExpectedCard { get; }

        public SingleCard()
        {
            GivenEntity = Utils.GetUser();
            var group = new Group
            {
                Name = "test-group",
                FrontLanguage = 1,
                BackLanguage = 2
            };
            group.AddCard(new Card
            {
                Id = 1,
                FrontValue = "front-value",
                FrontExample = "front-example",
                BackValue = "back-value",
                BackExample = "back-example",
            });
            GivenEntity.AddGroup(group);

            GivenRequest = new UpdateCardCommand
            {
                Id = 1,
                Front = new Side
                {
                    Value = "new-front-value",
                    Example = "new-front-example"
                },
                Back = new Side
                {
                    Value = "new-back-value",
                    Example = "new-back-example"
                }
            };

            ExpectedCard = new Card
            {
                Id = 1,
                FrontValue = "new-front-value",
                FrontExample = "new-front-example",
                BackValue = "new-back-value",
                BackExample = "new-back-example",
            };
        }
    }
}
