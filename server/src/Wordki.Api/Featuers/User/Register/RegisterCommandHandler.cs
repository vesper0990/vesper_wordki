using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Wordki.Api.Featuers.User.Register
{
    public class RegisterCommandHandler : IRequestHandler<RegisterCommand>
    {
        public Task<Unit> Handle(RegisterCommand request, CancellationToken cancellationToken)
        {
            return Unit.Task;
        }
    }
}
