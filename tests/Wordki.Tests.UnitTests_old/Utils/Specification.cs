using NUnit.Framework;
using System.Threading.Tasks;

namespace Wordki.Tests.UnitTests.Utils
{
    public abstract class Specification<TSut, TContext> where TContext : new()
    {
        public TSut Sut { get; set; }
        public TContext Context { get; set; } = new TContext();

        [SetUp]
        public virtual void Init()
        {
            Setup();
            When();
        }

        public abstract void Setup();
        public abstract Task When();
    }
}
