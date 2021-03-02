using Wordki.Api.Domain2;
using Wordki.Api.Responses;

namespace Wordki.Tests.E2E.Feature.GroupTests.QueryTests.GetDetailsTests
{
    public class EmptyGroup : GetDetailsContext
    {
        public override User GivenEntity { get; }

        public override GroupDetailsDto ExpectedResponse { get; }

        public EmptyGroup()
        {
            GivenEntity = Utils.GetUser();
            GivenEntity.AddGroup(new Group
            {
                Name = "test-name",
                FrontLanguage = 1,
                BackLanguage = 2,
                CreationDate = DateTimeMock.Yesterday.Date
            });

            ExpectedResponse = new GroupDetailsDto
            {
                Id = 1,
                Name = "test-name",
                LanguageFront = 1,
                LanguageBack = 2,
                CardsCount = 0,
                RepeatsCount = 0,
                CreationDate = DateTimeMock.Yesterday.Date,
            };
        }
    }
}