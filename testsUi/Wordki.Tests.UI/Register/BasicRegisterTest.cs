using NUnit.Framework;
using System.Threading;
using TestStack.BDDfy;

namespace Wordki.Tests.UI.Register
{
    [TestFixture]
    public class BasicRegisterTest : RegisterTestBase
    {

        void WhenUserNavigateToRegister()
        {
            Driver.Navigate().GoToUrl($"{AppUrl}/user/register");
            Thread.Sleep(200);
        }

        void ThenTitleShouldBeSet()
        {
            Assert.AreEqual("Wordki - Register", Driver.Title);
        }

        [Test]
        public void ExecuteTest()
        {
            this.BDDfy();
        }
    }
}
