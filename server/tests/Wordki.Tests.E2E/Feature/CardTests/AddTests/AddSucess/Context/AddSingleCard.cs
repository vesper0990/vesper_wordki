using System.Collections.Generic;
using Wordki.Api.Domain2;
using Wordki.Api.Featuers.Card.Add;

namespace Wordki.Tests.E2E.Feature.CardTests.AddTests
{
    public class AddSingleCard : AddSuccessContext
    {
        public override User GivenEntity { get; }
        public override AddCardCommand GivenRequest { get; }
        public override Card ExpectedCard { get; }

        public AddSingleCard()
        {
            GivenEntity = Utils.GetUser();
            GivenEntity.AddGroup(new Group
            {
                Id = 1,
                FrontLanguage = 1,
                BackLanguage = 2,
                CreationDate = DateTimeMock.Yesterday,
                Name = "test-group",
            });

            GivenRequest = new AddCardCommand
            {
                GroupId = 1,
                Front = new Side
                {
                    Value = "front-value",
                    Example = "front-example"
                },
                Back = new Side
                {
                    Value = "back-value",
                    Example = "back-example"
                }
            };

            ExpectedCard = new Card
            {
                Id = 1,
                FrontValue = "front-value",
                FrontExample = "front-example",
                BackValue = "back-value",
                BackExample = "back-example",
                CardDetails = new List<CardDetails>(){
                    new CardDetails{
                        Direction = Api.Domain.QuestionSideEnum.Front,
                        Drawer = 1,
                        NextRepeatDate = null,
                    },
                    new CardDetails{
                        Direction = Api.Domain.QuestionSideEnum.Back,
                        Drawer = 1,
                        NextRepeatDate = null,
                    }
                }
            };
        }
    }
}