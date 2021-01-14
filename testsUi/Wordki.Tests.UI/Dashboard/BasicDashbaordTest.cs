using NUnit.Framework;
using OpenQA.Selenium;
using TestStack.BDDfy;

namespace Wordki.Tests.UI.Dashboard
{
    [TestFixture]
    class BasicDashbaordTest : DashboardTestBase
    {
        void GivenCookieInApp() => SetAuthorizationCookie();

        void AndGivenSetupServer() => SetupDefaultDashboardEndpoints();

        void WhenUserNavigateToDashboard() => NavigateToDashboard();

        void ThenTitleShouldBeSet() => Assert.AreEqual("Wordki - Dashboard", Driver.Title);

        void AndThenTodaysRepeatIsDisplayed()
        {
            var element = Driver.FindElement(By.Id("lesson-card"));
            StringAssert.Contains("Today repeats", element.Text);
            StringAssert.Contains("1", element.Text);
        }

        void AndThenGroupsIsDisplayed()
        {
            var element = Driver.FindElement(By.Id("groups-card"));
            StringAssert.Contains("Groups", element.Text);
            StringAssert.Contains("1", element.Text);
        }

        void AndThenCardsIsDisplayed()
        {
            var element = Driver.FindElement(By.Id("cards-card"));
            StringAssert.Contains("Cards", element.Text);
            StringAssert.Contains("1", element.Text);
        }

        [Test]
        public void CheckPageAppearance() => this.BDDfy();
    }
}
