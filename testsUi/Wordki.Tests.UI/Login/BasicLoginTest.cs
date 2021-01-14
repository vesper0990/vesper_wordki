using NUnit.Framework;
using System.Threading;
using TestStack.BDDfy;

namespace Wordki.Tests.UI.Login
{
    [TestFixture]
    public class BasicLoginTest : UITestBase
    {

        void WhenUserNavigateToRegister()
        {
            Driver.Navigate().GoToUrl($"{AppUrl}/user/login");
            Thread.Sleep(200);
        }

        void ThenTitleShouldBeSet()
        {
            Assert.AreEqual("Wordki - Login", Driver.Title);
        }

        [Test]
        public void ExecuteTest()
        {
            this.BDDfy();
        }
    }


}
