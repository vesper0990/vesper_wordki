using System.Threading;
using NUnit.Framework;
using TestStack.BDDfy;

namespace Wordki.Tests.UI.Cards
{
    public class CardsTestBase : UITestBase
    {

    }

    [TestFixture]
    public class BasicCardsTest : CardsTestBase
    {
        void GivenCookies() => SetAuthorizationCookie();

        void AndGivenSetupServer() => SetupDefaultCardEndpoints();

        void WhenUserNavigateToGroup()
        {
            Driver.Navigate().GoToUrl($"{AppUrl}/details/1");
            Thread.Sleep(500);
        }

        void ThenTitleIsSet() => Assert.AreEqual("Wordki - Details", Driver.Title);

        [Test]
        public void Execute() => this.BDDfy();
    }
}