using System.Threading;

namespace Wordki.Tests.UI.Dashboard
{
    public class DashboardTestBase : UITestBase
    {
        protected void NavigateToDashboard()
        {
            Driver.Navigate().GoToUrl($"{AppUrl}/dashboard");
            Thread.Sleep(1000);
        }
    }
}
