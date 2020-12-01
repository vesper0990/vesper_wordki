using NUnit.Framework;
using System.Threading;
using TestStack.BDDfy;

namespace Wordki.Tests.UI.Home
{

    [TestFixture]
    public class BasicHomeTest : UITestBase
    {

        // void GivenServerEndpoints()
        // {
        //     Server.AddPostEndpoint("/user/register", "", body => true)
        //     .AddPutEndpoint("/user/login", "test", body => true)
        //     .AddGetEndpoint("/card/nextRepeat", ResponseBuilder.CreateResponse())
        //     .AddGetEndpoint("/card/lastAdded/1", ResponseBuilder.CreateResponse())
        //     .AddGetEndpoint("/card/lastFailed", ResponseBuilder.CreateResponse())
        //     .AddGetEndpoint("/lesson/todaysCardCount", 1)
        //     .AddGetEndpoint("/lesson/lastLessonDate", ResponseBuilder.CreateResponse())
        //     .AddGetEndpoint("/group/count", 1)
        //     .AddGetEndpoint("/card/count", 1);
        // }

        void WhenUserNavigateToApp()
        {
            Driver.Navigate().GoToUrl(AppUrl);
            Thread.Sleep(200);
        }

        void ThenWordkiTitleIsSet()
        {
            Assert.AreEqual("Wordki", Driver.Title);
        }

        // void WhenUserClickInRegiserButton()
        // {
        //     Driver.FindElement(By.CssSelector(".main-nav > li:nth-child(3)")).Click();
        // }

        // void ThenRegisterTitleIsSet()
        // {
        //     Assert.AreEqual("Wordki - Register", Driver.Title);
        // }

        // void AndThenFormIsDisplayed()
        // {
        //     Assert.Greater(Driver.FindElements(By.CssSelector("app-register-form")).Count, 0);
        // }

        // void WhenUserFillTheForm()
        // {
        //     var userNameEl = Driver.FindElement(By.Id("userName")).FindElement(By.CssSelector("input"));
        //     userNameEl.SendKeys("test");

        //     var passwordEl = Driver.FindElement(By.Id("password")).FindElement(By.CssSelector("input"));
        //     passwordEl.SendKeys("password");

        //     var passwordConfirmationEl = Driver.FindElement(By.Id("passwordConfirmation")).FindElement(By.CssSelector("input"));
        //     passwordConfirmationEl.SendKeys("password");
        // }

        // void AndWhenUserConfirmTheForm()
        // {
        //     Driver.FindElement(By.CssSelector("app-register-form")).FindElement(By.CssSelector("button")).Click();
        //     Thread.Sleep(1000);
        // }

        // void ThenDashboardTitleIsSet(){
        //     Assert.AreEqual("Wordki - dashboard", Driver.Title);
        // }

        [Test]
        public void ExecuteTest()
        {
            this.BDDfy();
        }
    }
}
