using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using OpenQA.Selenium;
using OpenQA.Selenium.Support.UI;

namespace Wordki.Tests.UI.PageObjectModels
{
    class CardsPage : Page
    {
        protected override string Title => "Wordki - Details";
        protected override string Url => $"{ApplicationUrl}/details/1";
        public EditCardElement EditDialog { get; set; }

        public CardsPage(IWebDriver driver) : base(driver) { }

        internal void WaitUntilDataIsLoaded()
        {
            var wait = new WebDriverWait(Driver, TimeSpan.FromMilliseconds(100));
            wait.Until(SeleniumExtras.WaitHelpers.ExpectedConditions.ElementToBeClickable(By.CssSelector("app-word-row")));
        }

        internal void ClickAddCardButton()
        {
            Driver.FindElement(By.Id("add-card-btn")).Click();
            EditDialog = new EditCardElement(Driver);
        }

        internal void ClickOnCard()
        {
            Driver.FindElement(By.CssSelector("app-word-row")).Click();
            EditDialog = new EditCardElement(Driver);
        }

        internal void WaitUntilDialogDisappear()
        {
            var wait = new WebDriverWait(Driver, TimeSpan.FromMilliseconds(20));
            wait.Until(SeleniumExtras.WaitHelpers.ExpectedConditions.ElementToBeClickable(By.CssSelector("app-word-row")));
        }

        internal IReadOnlyCollection<IWebElement> FindAllCards()
        {
            return Driver.FindElements(By.CssSelector("app-word-row"));
        }

        internal IWebElement FindCardByIndex(int cardIndex) => FindAllCards().ElementAt(cardIndex);

        internal IWebElement FindCardFront(IWebElement card) => card.FindElement(By.CssSelector(".main-container > .side:nth-of-type(1)"));
        internal IWebElement FindCardBack(IWebElement card) => card.FindElement(By.CssSelector(".main-container > .side:nth-of-type(2)"));
        internal string GetValue(IWebElement side) => side.FindElement(By.CssSelector(".word")).Text;
        internal string GetExample(IWebElement side) => side.FindElement(By.CssSelector(".example")).Text;
    }

    class DashboardPage : Page
    {
        protected override string Title => "Wordki - Dashboard";
        protected override string Url => $"{ApplicationUrl}/dashboard";

        public DashboardPage(IWebDriver driver) : base(driver) { }

        internal IWebElement FindTodayRepeat() => Driver.FindElement(By.Id("lesson-card"));
        internal IWebElement FindHistory() => Driver.FindElement(By.Id("history-card"));
        internal IWebElement FindGroups() => Driver.FindElement(By.Id("groups-card"));
        internal IWebElement FindCards() => Driver.FindElement(By.Id("cards-card"));
    }
}