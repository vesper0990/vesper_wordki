using FluentAssertions;
using NUnit.Framework;
using TestStack.BDDfy;

namespace Wordki.Tests.UI.Groups
{
    internal class DisplayingGroupsTest : GroupsTestBase
    {
        void GivenCookies() => SetAuthorizationCookie();

        void AndGivenSetupServer() => SetupGroupsAllEndpoint(2);

        void WhenUserNavigateToGroup() => Page.NavigateTo();

        void AndWhenPageIsLoaded() => Page.WaitUntilDataIsLoaded();

        void ThenGroupsAreDisplayed()
        {
            var groups = Page.FindAllGroups();
            groups.Should().HaveCount(2);
        }

        //[Test]
        public void Execute() => this.BDDfy();
    }
}