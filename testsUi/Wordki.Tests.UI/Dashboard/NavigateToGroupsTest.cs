using System.Threading;
using NUnit.Framework;
using OpenQA.Selenium;
using TestStack.BDDfy;

namespace Wordki.Tests.UI.Dashboard
{
    [TestFixture]
    public class NavigateToGroupsTest : DashboardTestBase
    {

        void GivenCookieInApp() => SetAuthorizationCookie();

        void AndGivenSetupServer()
        {
            SetupDefaultDashboardEndpoints();
            Server.AddGetEndpoint("/group/all", new object[0]);
        }

        void AndGivenUserNavigateToDashboard() => NavigateToDashboard();

        void WhenUserClickInLessonCard() {
            Driver.FindElement(By.Id("groups-card")).Click();
            Thread.Sleep(500);
        } 

        void ThenAppNavigateToLesson() => Assert.AreEqual($"{AppUrl}/groups", Driver.Url);

        [Test]
        public void CheckNavigationToGroups() => this.BDDfy();
    }
}
