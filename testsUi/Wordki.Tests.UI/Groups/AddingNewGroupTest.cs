using System.Threading;
using NUnit.Framework;
using OpenQA.Selenium;
using TestStack.BDDfy;

namespace Wordki.Tests.UI.Groups
{
    [TestFixture]
    public class AddingNewGroupTest : GroupsTestBase
    {

        void GivenCookies() => SetAuthorizationCookie();

        void AndGivenSetupServer()
        {
            SetupDefaultGroupEndpoints();
            Server.AddPostEndpoint("/group/add", "1", body => true);
        }

        void AndGivenUserNavigateToGroup()
        {
            Driver.Navigate().GoToUrl($"{AppUrl}/groups");
            Thread.Sleep(500);
        }

        void AndGivenUserClickAddGroupButton()
            => Driver.FindElement(By.Id("add-group-btn")).Click();

        void WhenUserFillTheForm()
        {
            var dialog = Driver.FindElement(By.CssSelector("app-edit-group-dialog"));

            dialog.FindElement(By.CssSelector("input[formcontrolname=\"name\"]")).SendKeys("group_name");

            dialog.FindElement(By.CssSelector("app-languages-drop-down[formcontrolname=\"language1\"]")).Click();
            Driver.FindElement(By.CssSelector("body > div > div > ul > p-dropdownitem:nth-child(2)")).Click();

            dialog.FindElement(By.CssSelector("app-languages-drop-down[formcontrolname=\"language2\"]")).Click();
            Driver.FindElement(By.CssSelector("body > div > div > ul > p-dropdownitem:nth-child(3)")).Click();

            dialog.FindElement(By.CssSelector("button[label=\"Save\"]")).Click();
            Thread.Sleep(500);
        }

        void ThenNewGroupShouldBeAdded()
            => Assert.AreEqual(1, Driver.FindElements(By.CssSelector("app-group-row")).Count);
        
        [Test]
        public void Execute() => this.BDDfy();
    }
}