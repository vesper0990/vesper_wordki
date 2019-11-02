using Autofac;
using Wordki.Core;
using Wordki.Tests.Utils.ServerMock;

namespace Wordki.Tests.EndToEnd
{
    public class TestServerMock : ServerMock<Startup>
    {
        protected override void ConfigureTestContainer(ContainerBuilder builder)
        {
        }

        protected override void CreateMocks()
        {
        }
    }
}
