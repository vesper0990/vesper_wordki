using FluentAssertions;
using NUnit.Framework;
using TestStack.BDDfy;

namespace Wordki.Tests.UI.Cards
{
    [TestFixture]
    internal class UpdateCardTest : CardsTestBase
    {

        void GivenCookies() => SetAuthorizationCookie();

        void AndGivenSetupServer()
        {
            SetupGroupDetailsEndpoint();
            SetupCardAllEndpoint();
            SetupUpdateCardEndpoint();
        }

        void WhenUserNavigateToGroup() => Page.NavigateTo();

        void AndWhenPageIsLoaded() => Page.WaitUntilDataIsLoaded();

        void AndWhenUserClickOnCard() => Page.ClickOnCard();

        void AndWhenUserFillTheForm()
        {
            Page.EditDialog.InsertIntoFrontLanguage("new-front-language", false);
            Page.EditDialog.InsertIntoFrontExample("new-front-example", false);
            Page.EditDialog.InsertIntoBackLanguage("new-back-language", false);
            Page.EditDialog.InsertIntoBackExample("new-back-example", false);
            Page.EditDialog.SelectCheckBox();
        }

        void AndWhenUserSubmitTheForm() => Page.EditDialog.ClickSave();

        void ThenCardsAreExist()
        {
            Page.WaitUntilDialogDisappear();
            var cards = Page.FindAllCards();
            cards.Should().HaveCount(2);
        }

        void AndThenCardIsUpdated()
        {
            var card = Page.FindCardByIndex(0);
            var front = Page.FindCardFront(card);
            Page.GetValue(front).Should().Be("new-front-language");
            Page.GetExample(front).Should().Be("new-front-example");

            var back = Page.FindCardBack(card);
            Page.GetValue(back).Should().Be("new-back-language");
            Page.GetExample(back).Should().Be("new-back-example");
        }

        //[Test]
        public void CheckUpdateingNewCard() => this.BDDfy();

    }
}