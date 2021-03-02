using System.Collections.Generic;
using Wordki.Api.Domain2;
using Wordki.Api.Responses;

namespace Wordki.Tests.E2E.Feature.GroupTests.QueryTests.GetGroupsTests
{
    public class EmptyGroup : GetGroupsContext
    {
        public override User GivenEntity { get; }
        public override IEnumerable<GroupDto> ExpectedResponse { get; }

        public EmptyGroup()
        {
            GivenEntity = Utils.GetUser();
            GivenEntity.AddGroup(new Group
            {
                Name = "group-name",
                FrontLanguage = 1,
                BackLanguage = 2,
            });

            ExpectedResponse = new GroupDto[1]{
                new GroupDto{
                    Id=1,
                    CardsCount =0,
                    LanguageBack = 2,
                    LanguageFront = 1,
                    Name = "group-name",
                    RepeatsCount = 0
                }
            };
        }
    }
}