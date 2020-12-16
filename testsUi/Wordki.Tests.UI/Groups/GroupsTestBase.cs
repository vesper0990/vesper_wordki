using Wordki.Tests.UI.PageObjectModels;

namespace Wordki.Tests.UI.Groups
{
    internal class GroupsTestBase : UITestBase
    {

        protected GroupsPage Page { get; }

        protected GroupsTestBase() : base()
        {
            Page = new GroupsPage(Driver);
        }

        protected void SetupGroupsAllEndpoint(int count) {
            var groups = new GroupDto[count];
            for (var i = 0; i < count; i++){
                groups[i] = new GroupDto
                {
                    Id = i + 1,
                    Name = $"group-{i + 1}",
                    LanguageFront = 1,
                    LanguageBack = 2,
                    CardsCount = 1,
                    RepeatsCount = 1
                };
            }
            Server.AddGetEndpoint("/group/all", groups);
        }

        protected void SetupAddGroupEndpoint()
        {
            Server.AddPostEndpoint("/group/add", 2, b => true);
        }

        protected void SetupUpdateGroupEndpoint(){
            Server.AddPutEndpoint("/group/update", string.Empty, b => true);
        }

        protected void SetupRemoveGroupEndpoint(){
            Server.AddDeleteEndpoint("/group/delete/1");
        }

    }
}