using FluentAssertions;
using NUnit.Framework;
using TestStack.BDDfy;

namespace Wordki.Tests.UI.Groups
{
    [TestFixture]
    internal class AddingNewGroupTest : GroupsTestBase
    {

        void GivenCookies() => SetAuthorizationCookie();

        void AndGivenSetupServer()
        {
            SetupGroupsAllEndpoint(1);
            SetupAddGroupEndpoint();
        }

        void WhenUserNavigateToGroup() => Page.NavigateTo();

        void AndWhenPageIsLoaded() => Page.WaitUntilDataIsLoaded();

        void AndWhenUserClickAddGroupButton() => Page.ClickAddGroupButton();

        void AndWhenAddDialogAppears() => Page.WaitUntilEditDialogAppear();

        void AndWhenUserFillsForm()
        {
            Page.Dialog.InsertIntoGroupName("new-group", false);
            Page.Dialog.SelectFrontLanguage();
            Page.Dialog.SelectBackLanguage();
        }

        void AndWhenUserClickSaveButton() => Page.Dialog.ClickSave();

        void AndWhenAddDialogDisappear() => Page.WaitUntilEditDialogDisappear();

        void ThenNewGroupShouldAppear()
        {
            var groups = Page.FindAllGroups();
            groups.Should().HaveCount(2);
        }

        void AndThenNewGroupShouldHaveProperValues()
        {
            var group = Page.FindGroupByIndex(1);
            var name = Page.FindNameEl(group);
            name.Text.Should().Be("new-group");

            var cardsCount = Page.FindCardsCountEl(group);
            cardsCount.Text.Should().Contain("0");

            var repeatsCount = Page.FindRepeatsCountEl(group);
            repeatsCount.Text.Should().Contain("0");
        }

        [Test]
        public void TestAddingNewGroup() => this.BDDfy();
    }
}