using System.Threading;
using NUnit.Framework;
using OpenQA.Selenium;
using TestStack.BDDfy;

namespace Wordki.Tests.UI.Groups
{
    public class DisplayingNoGroupsInfoTest : GroupsTestBase
    {
        void GivenCookies() => SetAuthorizationCookie();

        void AndGivenSetupServer()
            => Server.AddGetEndpoint("/group/all", new object[0]);


        void WhenUserNavigateToGroup()
        {
            Driver.Navigate().GoToUrl($"{AppUrl}/groups");
            Thread.Sleep(500);
        }

        void ThenGroupsAreDisplayed()
            => StringAssert.Contains("You do not have any groups yet", Driver.FindElement(By.CssSelector("body")).Text);


        [Test]
        public void Execute() => this.BDDfy();
    }
}