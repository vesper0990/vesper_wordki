using System.Linq;
using System.Threading.Tasks;
using Wordki.Core.Data;
using Wordki.Core.Services;
using Wordki.Utils.Commands;

namespace Wordki.Commands.RegisterRepeat
{
    public class RegisterRepeatCommandHandler : ICommandHandler<RegisterRepeatCommand>
    {
        private readonly IGroupRepository groupRepository;
        private readonly IRepeatOrganizer reapetOrganizer;

        public RegisterRepeatCommandHandler(IGroupRepository groupRepository, IRepeatOrganizer reapetOrganizer)
        {
            this.groupRepository = groupRepository;
            this.reapetOrganizer = reapetOrganizer;
        }

        public async Task HandleAsync(RegisterRepeatCommand command)
        {
            var group = await groupRepository.GetGroup(1);
            var word = group.Words.Single(x => x.Id == command.WordId);

        }
    }
}
