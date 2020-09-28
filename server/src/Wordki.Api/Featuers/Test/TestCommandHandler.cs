using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Wordki.Api.Featuers.Test
{
    public class TestCommandHandler : IRequestHandler<TestCommand, string>
    {
        public Task<string> Handle(TestCommand request, CancellationToken cancellationToken)
        {
            return Task.FromResult("Correct");
        }
    }
}
