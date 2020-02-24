using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Text;
using TestStack.BDDfy;

namespace Wordki.Tests.EndToEnd.GetLastFailedWord
{
    [TestFixture]
    public class UserGetLastFailedWord : TestBase
    {

        public UserGetLastFailedWord()
        {

        }

        [Test]
        public void Execute()
        {
            this.BDDfy();
        }

    }
}
