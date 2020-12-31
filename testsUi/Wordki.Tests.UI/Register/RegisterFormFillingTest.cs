using NUnit.Framework;
using OpenQA.Selenium;
using System.Threading;
using TestStack.BDDfy;

namespace Wordki.Tests.UI.Register
{
    [TestFixture]
    public class RegisterFormFillingTest : RegisterTestBase
    {

        void GivenSetupServerEndpoints(){
            SetupDefaultDashboardEndpoints();
            SetupRegisterEndpoints();
        }

        void AndGivenUserNavigateToRegister() => NavigateToRegister();

        void WhenUserFillsForm()
        {
            var userNameEl = Driver.FindElement(By.Id("userName")).FindElement(By.CssSelector("input"));
            userNameEl.SendKeys("test1");

            var passwordEl = Driver.FindElement(By.Id("password")).FindElement(By.CssSelector("input"));
            passwordEl.SendKeys("password");

            var passwordConfirmationEl = Driver.FindElement(By.Id("passwordConfirmation")).FindElement(By.CssSelector("input"));
            passwordConfirmationEl.SendKeys("password");
        }

        void AndWhenUserClickSubmitButton()
        {
            Driver.FindElement(By.CssSelector("app-register-form")).FindElement(By.CssSelector("button")).Click();
            Thread.Sleep(500);
        }

        void ThenUserIsRedirectToDashboard()
        {
            Assert.AreEqual($"{AppUrl}/dashboard", Driver.Url);
        }

        //[Test]
        public void ExecuteTest()
        {
            this.BDDfy();
        }
    }
}
