using System.Threading;
using NUnit.Framework;
using TestStack.BDDfy;

namespace Wordki.Tests.UI.Groups
{
    [TestFixture]
    internal class BasicGroupsTest : GroupsTestBase
    {

        void GivenCookies() => SetAuthorizationCookie();

        void AndGivenSetupServer() => SetupGroupsAllEndpoint(2);

        void WhenUserNavigateToGroup() => Page.NavigateTo();

        //[Test]
        public void Execute() => this.BDDfy();
    }
}