using System;
using System.Threading.Tasks;
using Wordki.Core.Data;
using Wordki.Utils.Commands;

namespace Wordki.Commands.ChangeGroupVisibility
{
    public class ChangeGroupVisibilityCommandHandler : ICommandHandler<ChangeGroupVisibilityCommand>
    {
        private readonly IGroupRepository repository;

        public ChangeGroupVisibilityCommandHandler(IGroupRepository repository)
        {
            this.repository = repository;
        }

        public async Task HandleAsync(ChangeGroupVisibilityCommand command)
        {
            var group = await repository.GetGroup(command.Id);
            if(group == null)
            {
                throw new Exception("Cannot find group");
            }
            if (command.IsAddedToLessons)
            {
                group.AddGroupToLessons();
            }
            else
            {
                group.RemoveGroupFromLessons();
            }
            await repository.SaveAsync(group);
        }
    }
}
