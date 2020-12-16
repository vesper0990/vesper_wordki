using System.Threading;
using FluentAssertions;
using NUnit.Framework;
using OpenQA.Selenium;
using TestStack.BDDfy;

namespace Wordki.Tests.UI.Cards
{
    [TestFixture]
    internal class AddingNewCardTest : CardsTestBase
    {

        void GivenCookies() => SetAuthorizationCookie();

        void AndGivenSetupServer()
        {
            SetupGroupDetailsEndpoint();
            SetupCardAllEndpoint();
            SetupAddCardEndpoint();
        }

        void WhenUserNavigateToGroup() => Page.NavigateTo();

        void AndWhenPageIsLoaded() => Page.WaitUntilDataIsLoaded();

        void AndWhenUserClickAddNewCardButton() => Page.ClickAddCardButton();
        

        void AndWhenUserFillTheForm()
        {
            Page.EditDialog.InsertIntoFrontLanguage("new-front-language", false);
            Page.EditDialog.InsertIntoFrontExample("new-front-example", false);
            Page.EditDialog.InsertIntoBackLanguage("new-back-language", false);
            Page.EditDialog.InsertIntoBackExample("new-back-example", false);
            Page.EditDialog.SelectCheckBox();
        }

        void AndWhenUserSubmitTheForm() => Page.EditDialog.ClickSave();

        void ThenNewCardShouldAppear()
        {
            Page.WaitUntilDialogDisappear();
            var cards = Page.FindAllCards();
            cards.Should().HaveCount(2); // todo
        }

        [Test]
        public void CheckAddingNewCard() => this.BDDfy();
    }
}