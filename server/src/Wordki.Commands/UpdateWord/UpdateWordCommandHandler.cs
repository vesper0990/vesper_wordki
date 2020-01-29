using System.Linq;
using System.Threading.Tasks;
using Wordki.Core.Data;
using Wordki.Utils.Commands;

namespace Wordki.Commands.UpdateWord
{
    public class UpdateWordCommandHandler : ICommandHandler<UpdateWordCommand>
    {
        private readonly IGroupRepository groupRepository;

        public UpdateWordCommandHandler(IGroupRepository groupRepository)
        {
            this.groupRepository = groupRepository;
        }

        public async Task HandleAsync(UpdateWordCommand command)
        {
            var group = await groupRepository.GetGroup(command.GroupId);
            var word = group.Words.Single(x => x.Id == command.WordId);
            word.Update(command.Language1, command.Language2, command.Example1, command.Example2, command.Comment, command.IsVisible);
            group.UpdateWord(word);
            await groupRepository.SaveAsync(group);
        }
    }
}
