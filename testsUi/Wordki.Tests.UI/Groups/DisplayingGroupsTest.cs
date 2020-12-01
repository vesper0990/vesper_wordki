using System.Threading;
using NUnit.Framework;
using OpenQA.Selenium;
using TestStack.BDDfy;

namespace Wordki.Tests.UI.Groups
{
    public class DisplayingGroupsTest : GroupsTestBase
    {
        void GivenCookies() => SetAuthorizationCookie();

        void AndGivenSetupServer()
            => Server.AddGetEndpoint("/group/all", ResponseBuilder.CreateRespnse());


        void WhenUserNavigateToGroup()
        {
            Driver.Navigate().GoToUrl($"{AppUrl}/groups");
            Thread.Sleep(500);
        }

        void ThenGroupsAreDisplayed()
            => Assert.AreEqual(3, Driver.FindElements(By.CssSelector("app-group-row")).Count);


        [Test]
        public void Execute() => this.BDDfy();
    }
}