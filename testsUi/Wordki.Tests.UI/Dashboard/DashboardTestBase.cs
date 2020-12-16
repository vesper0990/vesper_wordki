using System.Threading;
using Wordki.Tests.UI.PageObjectModels;

namespace Wordki.Tests.UI.Dashboard
{
    class DashboardTestBase : UITestBase
    {

        protected DashboardPage Page { get; }

        protected DashboardTestBase() : base()
        {
            Page = new DashboardPage(Driver);
        }

        protected void NavigateToDashboard()
        {
            Driver.Navigate().GoToUrl($"{AppUrl}/dashboard");
            Thread.Sleep(1000);
        }
    }
}
