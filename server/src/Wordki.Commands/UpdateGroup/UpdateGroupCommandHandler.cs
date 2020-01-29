using System.Threading.Tasks;
using Wordki.Core.Data;
using Wordki.Utils.Commands;

namespace Wordki.Commands.UpdateGroup
{
    public class UpdateGroupCommandHandler : ICommandHandler<UpdateGroupCommand>
    {
        private readonly IGroupRepository groupRepository;

        public UpdateGroupCommandHandler(IGroupRepository groupRepository)
        {
            this.groupRepository = groupRepository;
        }

        public async Task HandleAsync(UpdateGroupCommand command)
        {
            var group = await groupRepository.GetGroup(command.GroupId);
            group.Update(command.Name, command.Language1, command.Language2);
            await groupRepository.SaveAsync(group);
        }
    }
}