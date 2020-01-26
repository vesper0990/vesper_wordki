using System.Threading.Tasks;
using Wordki.Core;
using Wordki.Core.Data;
using Wordki.Utils.Commands;

namespace Wordki.Commands.AddWord
{
    public class AddWordCommandHandler : ICommandHandler<AddWordCommand>
    {
        private readonly IGroupRepository groupRepository;
        private readonly IWordFactory wordFactory;

        public AddWordCommandHandler(IGroupRepository groupRepository, IWordFactory wordFactory)
        {
            this.groupRepository = groupRepository;
            this.wordFactory = wordFactory;
        }

        public async Task HandleAsync(AddWordCommand command)
        {
            var group = await groupRepository.GetGroup(command.GroupId);
            var newWord = wordFactory.Create(command.GroupId, command.Language1, command.Language2, string.Empty, string.Empty, string.Empty);
            group.AddWord(newWord);
            await groupRepository.SaveAsync(group);
        }
    }
}
