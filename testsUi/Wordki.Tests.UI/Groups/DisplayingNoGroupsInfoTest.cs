using FluentAssertions;
using NUnit.Framework;
using TestStack.BDDfy;

namespace Wordki.Tests.UI.Groups
{
    internal class DisplayingNoGroupsInfoTest : GroupsTestBase
    {
        void GivenCookies() => SetAuthorizationCookie();

        void AndGivenSetupServer() => SetupGroupsAllEndpoint(0);

        void WhenUserNavigateToGroup() => Page.NavigateTo();

        void AndWhenPageIsLoaded() => Page.WaitUntilDataIsLoaded();

        void ThenInfoIsDisplayed(){
            var info = Page.FindNoGroupInfo();
            info.Text.Should().Be("You do not have any groups yet.");
        }

        [Test]
        public void Execute() => this.BDDfy();
    }
}