using OpenQA.Selenium;

namespace Wordki.Tests.UI.PageObjectModels
{
    class EditGroupElement
    {
        private readonly IWebElement _editDialog;
        private readonly IWebDriver _driver;

        public EditGroupElement(IWebDriver driver)
        {
            _editDialog = driver.FindElement(By.CssSelector("app-edit-group-dialog"));
            _driver = driver;
        }

        internal void InsertIntoGroupName(string text, bool append) => InsertIntoInput("name", text, append);
        internal void SelectFrontLanguage() => SelectDropDown("languageFront", 3);
        internal void SelectBackLanguage() => SelectDropDown("languageBack", 2);

        private void SelectDropDown(string controlName, int item)
        {
            _editDialog.FindElement(By.CssSelector(string.Format("app-languages-drop-down[formcontrolname=\"{0}\"]", controlName))).Click();
            _driver.FindElement(By.CssSelector(string.Format("body > div > div > ul > p-dropdownitem:nth-child({0})", item))).Click();
        }

        internal void ClickSave()
        {
            _editDialog.FindElement(By.XPath("//*[text()='Save']")).Click();
        }

        internal void ClickRemoved()
        {
            _editDialog.FindElement(By.XPath("//*[text()='Remove']")).Click();
        }


        private void InsertIntoInput(string controlName, string text, bool append)
        {
            var input = _editDialog.FindElement(By.CssSelector(string.Format("input[formcontrolname=\"{0}\"]", controlName)));
            if (!append) input.Clear();
            input.SendKeys(text);
        }

    }


}