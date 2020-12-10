using System.Threading;
using NUnit.Framework;
using OpenQA.Selenium;
using TestStack.BDDfy;

namespace Wordki.Tests.UI.Groups
{
    [TestFixture]
    public class UpdatingGroupTest : GroupsTestBase
    {

        void GivenCookies() => SetAuthorizationCookie();

        void AndGivenSetupServer()
        {
            Server.AddGetEndpoint("/group/all", new []{
                new GroupDto{
                    id = 1,
                    name = "group_name",
                    language1 = 1,
                    language2 = 2,
                    cardsCount = 1
                }
            });
            Server.AddPutEndpoint("/group/update", new {}, body => true);
        }

        void AndGivenUserNavigateToGroup()
        {
            Driver.Navigate().GoToUrl($"{AppUrl}/groups");
            Thread.Sleep(500);
        }

        void AndGivenUserClickEditGroupButton(){
            Driver.FindElement(By.CssSelector("body > app-root > ng-component > div:nth-child(2) > app-group-row > div > div.edit-button > img")).Click();
        }

        void WhenUserFillTheForm()
        {
            var dialog = Driver.FindElement(By.CssSelector("app-edit-group-dialog"));

            dialog.FindElement(By.CssSelector("input[formcontrolname=\"name\"]")).SendKeys("222");

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