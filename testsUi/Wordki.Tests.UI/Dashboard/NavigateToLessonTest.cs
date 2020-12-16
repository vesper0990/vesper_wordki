using System.Threading;
using NUnit.Framework;
using OpenQA.Selenium;
using TestStack.BDDfy;

namespace Wordki.Tests.UI.Dashboard
{
    [TestFixture]
    class NavigateToLessonTest : DashboardTestBase
    {

        void GivenCookieInApp() => SetAuthorizationCookie();

        void AndGivenSetupServer()
        {
            SetupDefaultDashboardEndpoints();
            Server.AddPostEndpoint("/lesson/start", 1, body => true)
                .AddGetEndpoint("/card/allRepeats", new object[0]);
        }

        void AndGivenUserNavigateToDashboard() => NavigateToDashboard();

        void WhenUserClickInLessonCard()
        {
            Driver.FindElement(By.Id("lesson-card")).Click();
            Thread.Sleep(500);
        }

        void ThenAppNavigateToLesson() => Assert.AreEqual($"{AppUrl}/lesson/fiszki", Driver.Url);

        [Test]
        public void CheckNavigationToLesson() => this.BDDfy();
    }
}
