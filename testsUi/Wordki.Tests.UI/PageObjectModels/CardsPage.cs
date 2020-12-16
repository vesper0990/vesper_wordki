using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using FluentAssertions;
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

    class EditCardElement
    {
        private readonly IWebElement _editDialog;
        private readonly IWebDriver _driver;

        public EditCardElement(IWebDriver driver)
        {
            _editDialog = driver.FindElement(By.CssSelector("app-edit-word-dialog"));
            _driver = driver;
        }



        public void InsertIntoFrontLanguage(string text, bool append) => InsertIntoInput("language1", text, append);
        public void InsertIntoBackLanguage(string text, bool append) => InsertIntoInput("language2", text, append);
        public void InsertIntoFrontExample(string text, bool append) => InsertIntoInput("example1", text, append);
        public void InsertIntoBackExample(string text, bool append) => InsertIntoInput("example2", text, append);
        public void SelectCheckBox() => _editDialog.FindElement(By.CssSelector("p-checkbox")).Click();
        internal void ClickSave()
        {
            _editDialog.FindElement(By.Id("save-btn")).Click();
        }


        private void InsertIntoInput(string controlName, string text, bool append)
        {
            var input = _editDialog.FindElement(By.CssSelector(string.Format("input[formcontrolname=\"{0}\"]", controlName)));
            if (!append) input.Clear();
            input.SendKeys(text);
        }

    }

    abstract class Page
    {
        protected const string ApplicationUrl = "http://localhost:4201";
        protected IWebDriver Driver { get; }
        protected virtual string Url { get; }
        protected virtual string Title { get; }

        protected Page(IWebDriver driver)
        {
            Driver = driver;
        }

        public void NavigateTo()
        {
            Driver.Navigate().GoToUrl(Url);
            EnsurePageLoaded();
        }

        public void EnsurePageLoaded()
        {

            Driver.Url.Should().Be(Url);
            Driver.Title.Should().Be(Title);
        }
    }


}