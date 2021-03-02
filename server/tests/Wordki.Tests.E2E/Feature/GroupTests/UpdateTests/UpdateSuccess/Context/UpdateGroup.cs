using System.Net;
using Wordki.Api.Domain2;
using Wordki.Api.Featuers.Group.Update;

namespace Wordki.Tests.E2E.Feature.GroupTests.UpdateTests
{
    class UpdateGroup : UpdateSuccessContext
    {
        public override User GivenEntity { get; }

        public override UpdateGroupCommand GivenRequest => new UpdateGroupCommand
        {
            Id = 1,
            Name = "name-after",
            LanguageBack = 2,
            LanguageFront = 1
        };

        public override HttpStatusCode ExpectedStatusCode => HttpStatusCode.OK;

        public override Group ExpectedGroup { get; }

        public UpdateGroup()
        {
            GivenEntity = Utils.GetUser();
            GivenEntity.AddGroup(new Group
            {
                Name = "name-before",
                BackLanguage = 1,
                FrontLanguage = 2,
                CreationDate = DateTimeMock.Yesterday
            });

            ExpectedGroup = new Group
            {
                Id = 1,
                BackLanguage = 2,
                FrontLanguage = 1,
                Name = "name-after",
                CreationDate = DateTimeMock.Yesterday
            };
        }
    }
}