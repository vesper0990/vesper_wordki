using System.Threading;
using NUnit.Framework;
using TestStack.BDDfy;

namespace Wordki.Tests.UI.Groups
{
    [TestFixture]
    public class BasicGroupsTest : GroupsTestBase
    {

        void GivenCookies() => SetAuthorizationCookie();

        void AndGivenSetupServer() => SetupDefaultGroupEndpoints();

        void WhenUserNavigateToGroup()
        {
            Driver.Navigate().GoToUrl($"{AppUrl}/groups");
            Thread.Sleep(500);
        }

        void ThenTitleIsSet() => Assert.AreEqual("Wordki - Groups", Driver.Title);

        [Test]
        public void Execute() => this.BDDfy();
    }
}