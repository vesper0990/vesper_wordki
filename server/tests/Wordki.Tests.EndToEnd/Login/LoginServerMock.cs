using System;
using Autofac;
using Moq;
using Microsoft.Extensions.DependencyInjection;
using Wordki.Core;
using Wordki.Core.Data;
using Wordki.Infrastructure.Services;
using Wordki.Tests.Utils.ServerMock;
using Wordki.Utils.TimeProvider;

namespace Wordki.Tests.EndToEnd.Login
{
    public class LoginServerMock : ServerMock<Startup>
    {

        protected override void ConfigureTestContainer(ContainerBuilder builder)
        {
        }

        protected override void CreateMocks()
        {
        }
    }
}
