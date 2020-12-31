using FluentAssertions;
using NUnit.Framework;
using TestStack.BDDfy;

namespace Wordki.Tests.UI.Cards
{
    [TestFixture]
    internal class RemovingCardTest : CardsTestBase
    {
        void GivenCookies() => SetAuthorizationCookie();

        void AndGivenSetupServer()
        {
            SetupGroupDetailsEndpoint();
            SetupCardAllEndpoint();
            SetupRemoveCardEndpoint();
        }

        void WhenUserNavigateToGroup() => Page.NavigateTo();

        void AndWhenPageIsLoaded() => Page.WaitUntilDataIsLoaded();

        void AndWhenUserClickOnCard() => Page.ClickOnCard();

        void AndWhenUserClickRemoveButton() => Page.EditDialog.ClickRemoved();

        void ThenCardsAreExist()
        {
            Page.WaitUntilDialogDisappear();
            var cards = Page.FindAllCards();
            cards.Should().HaveCount(1);
        }

        //[Test]
        public void TestRemovingCard() => this.BDDfy();
    }
}