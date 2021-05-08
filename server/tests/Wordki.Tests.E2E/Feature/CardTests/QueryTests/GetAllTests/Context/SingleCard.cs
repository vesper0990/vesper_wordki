using System.Collections.Generic;
using Wordki.Api.Domain2;
using Wordki.Api.Responses;

namespace Wordki.Tests.E2E.Feature.CardTests.QueryTests.GetAllTests
{
    public class SingleCard : GetAllContext
    {
        public override User GivenEntity { get; }
        public override IEnumerable<CardDetailsDto> ExpectedResponse { get; }
        public SingleCard()
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
            card.BackDetails.NextRepeatDate = DateTimeMock.Tomorrow;
            group.AddCard(card);
            GivenEntity.AddGroup(group);

            ExpectedResponse = new CardDetailsDto[]
            {
                new CardDetailsDto
                {
                    Id = 1,
                    Front = new SideDetailsDto{
                        Drawer =0,
                        IsVisible = true,
                        Value = "front-value",
                        Example = "front-example",
                        Language = 2,
                        NextRepeat = DateTimeMock.Tomorrow,
                        RepeatCount = 0
                    },
                    Back = new SideDetailsDto{
                        Drawer =0,
                        IsVisible = true,
                        Value = "back-value",
                        Example = "back-example",
                        Language = 2,
                        NextRepeat = DateTimeMock.Tomorrow,
                        RepeatCount = 0
                    }
                }
            };
        }
    }
}