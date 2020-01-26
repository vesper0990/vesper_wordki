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
            word.UpdateLanguage1(command.Language1);
            word.UpdateLanguage2(command.Language2);
            

        }
    }
}
