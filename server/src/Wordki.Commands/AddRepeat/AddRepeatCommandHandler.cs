using System;
using System.Threading.Tasks;
using Wordki.Utils.Commands;

namespace Wordki.Commands.AddRepeat
{
    public class AddRepeatCommandHandler : ICommandHandler<AddRepeatCommand>
    {

        public AddRepeatCommandHandler()
        {

        }

        public Task HandleAsync(AddRepeatCommand command)
        {

            // get word with repeats
            // update domain object
            // save in repo
        }
    }
}
