using FluentAssertions;
using NUnit.Framework;
using TestStack.BDDfy;

namespace Wordki.Tests.UI.Groups
{
    [TestFixture]
    internal class UpdatingGroupTest : GroupsTestBase
    {
        void GivenCookies() => SetAuthorizationCookie();

        void AndGivenSetupServer()
        {
            SetupGroupsAllEndpoint(1);
            SetupUpdateGroupEndpoint();
        }

        void WhenUserNavigateToGroup() => Page.NavigateTo();

        void AndWhenPageIsLoaded() => Page.WaitUntilDataIsLoaded();

        void AndWhenUserClickEditGroupButton() => Page.ClickEditGroupButton(0);

        void AndWhenEditDialogAppears() => Page.WaitUntilEditDialogAppear();

        void AndWhenUserFillsForm()
        {
            Page.Dialog.InsertIntoGroupName("-test", true);
            Page.Dialog.SelectFrontLanguage();
            Page.Dialog.SelectBackLanguage();
        }

        void AndWhenUserClickSaveButton() => Page.Dialog.ClickSave();

        void AndWhenAddDialogDisappear() => Page.WaitUntilEditDialogDisappear();

        void ThenGroupShouldBeUpdated()
        {
            var groups = Page.FindAllGroups();
            groups.Should().HaveCount(1);

            var group = Page.FindGroupByIndex(0);
            var name = Page.FindNameEl(group);
            name.Text.Should().Be("group-1-test");

            var cardsCount = Page.FindCardsCountEl(group);
            cardsCount.Text.Should().Contain("1");

            var repeatsCount = Page.FindRepeatsCountEl(group);
            repeatsCount.Text.Should().Contain("1");
        }

        [Test]
        public void TestUpdatingGroup() => this.BDDfy();
    }

    internal class RemovingGroupTest : GroupsTestBase
    {
        void GivenCookies() => SetAuthorizationCookie();

        void AndGivenSetupServer()
        {
            SetupGroupsAllEndpoint(2);
            SetupRemoveGroupEndpoint();
        }

        void WhenUserNavigateToGroup() => Page.NavigateTo();

        void AndWhenPageIsLoaded() => Page.WaitUntilDataIsLoaded();

        void AndWhenUserClickEditGroupButton() => Page.ClickEditGroupButton(0);

        void AndWhenEditDialogAppears() => Page.WaitUntilEditDialogAppear();

        void AndWhenUserClickRemoveButton() => Page.Dialog.ClickRemoved();

        void AndWhenAddDialogDisappear() => Page.WaitUntilEditDialogDisappear();

        void ThenGroupShouldBeUpdated()
        {
            var groups = Page.FindAllGroups();
            groups.Should().HaveCount(1);
        }

        [Test]
        public void TestUpdatingGroup() => this.BDDfy();
    }
}