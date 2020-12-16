using System.Threading;
using NUnit.Framework;
using TestStack.BDDfy;

namespace Wordki.Tests.UI.Cards
{
    [TestFixture]
    internal class BasicCardsTest : CardsTestBase
    {
        void GivenCookies() => SetAuthorizationCookie();

        void AndGivenSetupServer()
        {
            SetupGroupDetailsEndpoint();
            SetupCardAllEndpoint();
        }

        void WhenUserNavigateToGroup()
        {
            Driver.Navigate().GoToUrl($"{AppUrl}/details/1");
            Thread.Sleep(500);
        }

        void ThenTitleIsSet() => Assert.AreEqual("Wordki - Details", Driver.Title);

        [Test]
        public void CheckPageAppearance() => this.BDDfy();
    }
}