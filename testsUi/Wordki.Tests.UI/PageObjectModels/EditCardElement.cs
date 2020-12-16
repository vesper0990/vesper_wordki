using OpenQA.Selenium;

namespace Wordki.Tests.UI.PageObjectModels
{
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

        internal void ClickRemoved()
        {
            _editDialog.FindElement(By.Id("remove-btn")).Click();
        }


        private void InsertIntoInput(string controlName, string text, bool append)
        {
            var input = _editDialog.FindElement(By.CssSelector(string.Format("input[formcontrolname=\"{0}\"]", controlName)));
            if (!append) input.Clear();
            input.SendKeys(text);
        }

    }


}