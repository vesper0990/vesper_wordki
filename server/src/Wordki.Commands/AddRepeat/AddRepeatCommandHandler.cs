using System;
using System.Linq;
using System.Threading.Tasks;
using Wordki.Core.Data;
using Wordki.Core.Domain;
using Wordki.Core.Services;
using Wordki.Utils.Commands;

namespace Wordki.Commands.AddRepeat
{
    public class AddRepeatCommandHandler : ICommandHandler<AddRepeatCommand>
    {
        private readonly IGroupRepository groupRepository;
        private readonly IRepeatFactory repeatFactory;
        private readonly IRepeatOrganizer repeatOrganizer;

        public AddRepeatCommandHandler(IGroupRepository groupRepository,
            IRepeatFactory repeatFactory,
            IRepeatOrganizer repeatOrganizer)
        {
            this.groupRepository = groupRepository;
            this.repeatFactory = repeatFactory;
            this.repeatOrganizer = repeatOrganizer;
        }

        public async Task HandleAsync(AddRepeatCommand command)
        {
            var groups = await groupRepository.GetGroupsAsync(command.UserId);
            var word = groups.SelectMany(x => x.Words).SingleOrDefault(x => x.Id == command.WordId);
            var group = groups.Single(x => x.Id == word.GroupId);
            var newRepeat = repeatOrganizer.NoticeRepeat(word, command.Result);
            await groupRepository.SaveAsync(group);
        }
    }
}
