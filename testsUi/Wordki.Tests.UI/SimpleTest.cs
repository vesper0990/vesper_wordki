using NUnit.Framework;
using OpenQA.Selenium.Chrome;
using System.Threading;

namespace Wordki.Tests.UI
{
    [TestFixture]
    class SimpleTest
    {
        [Test]
        public void Test1()
        {
            ChromeOptions options = new ChromeOptions();
            options.AddArguments("headless");
            options.AddArguments("diable-dev-shm-usage", "disable-gpu", "disable-infobars", "ignore-certificate-errors", "no-sandbox");
            using (var driver = new ChromeDriver(options))
            {
                driver.Navigate().GoToUrl("http://wordki.client.ui.test:8080");
                Thread.Sleep(1000);

                Assert.AreEqual("Wordki", driver.Title);
            }
        }
    }
}
