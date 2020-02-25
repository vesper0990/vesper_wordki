using System;
using System.Threading.Tasks;
using Wordki.Core.Data;
using Wordki.Utils.Commands;

namespace Wordki.Commands.AddRepeat
{
    public class AddRepeatCommandHandler : ICommandHandler<AddRepeatCommand>
    {
        private readonly IWordRepository wordRepository;

        public AddRepeatCommandHandler(IWordRepository wordRepository)
        {
            this.wordRepository = wordRepository;
        }

        public Task HandleAsync(AddRepeatCommand command)
        {
            var word = wordRepository.

            return null;
            // get word with repeats
            // update domain object
            // save in repo
        }
    }
}
