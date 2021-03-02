using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using FluentAssertions;
using Xunit;

namespace Wordki.Tests.E2E
{
    public class LoginTests
    {
        // [Theory]
        [ClassData(typeof(CalculatorTestData))]
        public Task Test(UserLoginContext context)
        {
            context.GivenValue.Should().Be(context.ExpectedValue);
            return Task.CompletedTask;
        }
    }

    public abstract class UserLoginContext
    {
        public abstract bool GivenValue { get; }
        public abstract bool ExpectedValue { get; }
    }

    public class UserExists : UserLoginContext
    {
        public override bool GivenValue => true;

        public override bool ExpectedValue => true;
    }

    public class UserExists2 : UserLoginContext
    {
        public override bool GivenValue => false;

        public override bool ExpectedValue => false;
    }

    public class ContextGen<TContext> : IEnumerable<TContext[]> where TContext : new()
    {
        public IEnumerator<TContext[]> GetEnumerator()
        {
            yield return new TContext[] {
                new TContext()
                };
        }

        IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();
    }

    public abstract class TheoryData : IEnumerable<object[]>
    {
        readonly List<object[]> data = new List<object[]>();

        protected void AddRow(params object[] values)
        {
            data.Add(values);
        }

        public IEnumerator<object[]> GetEnumerator()
        {
            return data.GetEnumerator();
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return GetEnumerator();
        }
    }

    public class TheoryData<T1> : TheoryData
    {
        public void Add(T1 p1)
        {
            AddRow(p1);
        }
    }

    public class CalculatorTestData : TheoryData<UserLoginContext>
    {
        public CalculatorTestData()
        {
            Add(new UserExists());
            Add(new UserExists2());
        }
    }
}