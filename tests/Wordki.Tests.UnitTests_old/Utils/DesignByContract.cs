using NUnit.Framework;
using System;
using System.Threading.Tasks;

namespace Wordki.Tests.UnitTests.Utils
{
    public interface IDesignByContractContext
    {
        string Expected_ExceptionMessage { get; }
        Type Expected_ExceptionType { get; }
    }

    public abstract class DesignByContractSpecification<TSut, TContext> where TContext : IDesignByContractContext, new()
    {
        protected TContext context;
        protected TSut sut;
        protected Exception exception;

        public DesignByContractSpecification()
        {
            context = new TContext();
        }

        public abstract Task When();

        [SetUp]
        public async Task SetUp()
        {
            try
            {
                await When();
            }
            catch (Exception e)
            {
                exception = e;
            }
        }

        [Test]
        public void Then_ExceptionShouldBeCorrectType()
        {
            Assert.AreEqual(exception.GetType(), context.Expected_ExceptionType);
        }

        [Test]
        public void Then_ExceptionShouldContainMessage()
        {
            Assert.AreEqual(exception.Message, context.Expected_ExceptionMessage);
        }
    }
}
