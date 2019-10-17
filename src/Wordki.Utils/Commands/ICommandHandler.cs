using System.Threading.Tasks;

namespace Wordki.Utils.Commands
{
    public interface ICommandHandler<TCommand> 
        where TCommand : ICommand
    {
        Task HandleAsync(TCommand command);
    }
}
