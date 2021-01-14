using FluentAssertions;
using OpenQA.Selenium;

namespace Wordki.Tests.UI.PageObjectModels
{
    abstract class Page
    {
        protected const string ApplicationUrl = "http://wordki-client.ci.e2etests:81";
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