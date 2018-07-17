using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Wordki.Tests.EndToEnd.Controllers.Users
{
    [TestFixture]
    public class Test : TestBase
    {

        public Test() : base()
        {

        }

        [Test]
        public async Task Try_test()
        {

            var response = await client.GetAsync("Users/test");


        }

    }
}
