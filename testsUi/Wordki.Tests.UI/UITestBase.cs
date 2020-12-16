using NUnit.Framework;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using System;
using System.Threading;
using WireMock.Server;

namespace Wordki.Tests.UI
{
    public abstract class UITestBase : IDisposable
    {
        protected const string AppUrl = "http://localhost:4201";


        protected IWebDriver Driver { get; private set; }
        protected WireMockServer Server { get; private set; }

        protected UITestBase()
        {
            var options = new ChromeOptions();
            // options.AddArguments("headless");
            options.AddArguments("diable-dev-shm-usage",
             "disable-gpu",
              "disable-infobars",
              "ignore-certificate-errors",
               "no-sandbox");
            Driver = new ChromeDriver(options);
        }

        [SetUp]
        protected void SetupUtils()
        {
            Server = WireMockFactory.Create("http://localhost:5001");
        }

        [TearDown]
        protected void TearDownUtils()
        {
            Server.Stop();
            Server.Dispose();

            Dispose();
        }

        public void Dispose()
        {
            Driver.Quit();
            Driver.Dispose();
        }

        protected void SetAuthorizationCookie()
        {
            Driver.Navigate().GoToUrl($"{AppUrl}");
            Thread.Sleep(200);
            Driver.Manage().Cookies.AddCookie(new Cookie("wordki-usr-tag", "token"));
        }

        protected void SetupDefaultDashboardEndpoints() =>
            Server.AddGetEndpoint("/card/nextRepeat", ResponseBuilder.CreateResponse())
                  .AddGetEndpoint("/card/lastAdded/1", ResponseBuilder.CreateResponse())
                  .AddGetEndpoint("/card/lastFailed", ResponseBuilder.CreateResponse())
                  .AddGetEndpoint("/lesson/todaysCardCount", 1)
                  .AddGetEndpoint("/lesson/lastLessonDate", ResponseBuilder.CreateResponse())
                  .AddGetEndpoint("/group/count", 1)
                  .AddGetEndpoint("/card/count", 1);

        protected void SetupDefaultGroupEndpoints() =>
            Server.AddGetEndpoint("/group/all", new object[0]);

        protected void SetupDefaultCardEndpoints() =>
            Server.AddGetEndpoint("/group/details/1", new { })
            .AddGetEndpoint("/card/all/1", new object[0]);
    }


}
