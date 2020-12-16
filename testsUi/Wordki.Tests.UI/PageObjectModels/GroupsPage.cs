using System;
using System.Collections.Generic;
using System.Linq;
using OpenQA.Selenium;
using OpenQA.Selenium.Support.UI;

namespace Wordki.Tests.UI.PageObjectModels
{
    class GroupsPage : Page
    {
        private WebDriverWait Wait => new WebDriverWait(Driver, TimeSpan.FromMilliseconds(10000));
        protected override string Title => "Wordki - Groups";
        protected override string Url => $"{ApplicationUrl}/groups";
        internal EditGroupElement Dialog { get; set; }

        public GroupsPage(IWebDriver driver) : base(driver) { }

        internal void WaitUntilDataIsLoaded()
        {
            Wait.Until(SeleniumExtras.WaitHelpers.ExpectedConditions.InvisibilityOfElementLocated(By.Id("progress-bar")));
        }

        internal void WaitUntilEditDialogAppear()
        {
            Wait.Until(SeleniumExtras.WaitHelpers.ExpectedConditions.ElementToBeClickable(By.CssSelector("app-edit-group-dialog")));
            Dialog = new EditGroupElement(Driver);
        }

        internal void WaitUntilEditDialogDisappear()
        {
            Wait.Until(SeleniumExtras.WaitHelpers.ExpectedConditions.InvisibilityOfElementLocated(By.CssSelector("app-edit-group-dialog")));
        }

        internal void ClickAddGroupButton() => Driver.FindElement(By.Id("add-group-btn")).Click();

        internal IReadOnlyCollection<IWebElement> FindAllGroups() => Driver.FindElements(By.CssSelector("app-group-row"));

        internal IWebElement FindNoGroupInfo() => Driver.FindElement(By.Id("no-groups-info"));

        internal IWebElement FindGroupByIndex(int index) => FindAllGroups().ElementAt(index);

        internal IWebElement FindNameEl(IWebElement element) => element.FindElement(By.ClassName("group-label"));

        internal IWebElement FindCardsCountEl(IWebElement element) => element.FindElement(By.CssSelector("app-label-value:nth-of-type(1)"));
        internal IWebElement FindRepeatsCountEl(IWebElement element) => element.FindElement(By.CssSelector("app-label-value:nth-of-type(2)"));

        internal void ClickEditGroupButton(int index) => FindGroupByIndex(0).FindElement(By.ClassName("edit-button")).Click();

    }


}