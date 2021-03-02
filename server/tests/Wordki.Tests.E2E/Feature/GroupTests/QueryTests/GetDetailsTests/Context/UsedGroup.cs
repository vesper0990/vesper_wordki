using Wordki.Api.Domain2;
using Wordki.Api.Responses;

namespace Wordki.Tests.E2E.Feature.GroupTests.QueryTests.GetDetailsTests
{
    public class UsedGroup : GetDetailsContext
    {
        public override User GivenEntity { get; }

        public override GroupDetailsDto ExpectedResponse { get; }

        public UsedGroup()
        {
            GivenEntity = Utils.GetUser();
            var group = new Group
            {
                Name = "test-name",
                FrontLanguage = 1,
                BackLanguage = 2,
                CreationDate = DateTimeMock.Yesterday.Date
            };
            group.AddCard(new Card { });
            group.AddCard(new Card { });

            GivenEntity.AddGroup(group);

            ExpectedResponse = new GroupDetailsDto
            {
                Id = 1,
                Name = "test-name",
                LanguageFront = 1,
                LanguageBack = 2,
                CardsCount = 2,
                RepeatsCount = 0,
                CreationDate = DateTimeMock.Yesterday.Date,
            };
        }
    }
}