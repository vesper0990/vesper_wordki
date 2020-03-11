using System.Threading.Tasks;
using Wordki.Core.Data;
using Wordki.Utils.Commands;

namespace Wordki.Commands.RemoveWord{
    public class RemoveWordCommandHandler : ICommandHandler<RemoveWordCommand>
    {
        private readonly IGroupRepository groupRepository;

        public RemoveWordCommandHandler(IGroupRepository groupRepository){
            this.groupRepository = groupRepository;
        }

        public async Task HandleAsync(RemoveWordCommand command)
        {
            var group = await groupRepository.GetGroup(command.GroupId);
            group.RemoveWord(command.WordId);

            await groupRepository.SaveAsync(group);
        }
    }
}