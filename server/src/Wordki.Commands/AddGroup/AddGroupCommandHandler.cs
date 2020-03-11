using System.Threading.Tasks;
using Wordki.Core;
using Wordki.Core.Data;
using Wordki.Utils.Commands;
using Wordki.Utils.TimeProvider;

namespace Wordki.Commands.AddGroup
{
    public class AddGroupCommandHandler : ICommandHandler<AddGroupCommand>
    {
        private readonly IGroupRepository groupRepository;
        private readonly IWordFactory wordFactory;
        private readonly ITimeProvider timeProvider;

        public AddGroupCommandHandler(IGroupRepository groupRepository, IWordFactory wordFactory, ITimeProvider timeProvider){
            this.groupRepository = groupRepository;
            this.wordFactory = wordFactory;
            this.timeProvider = timeProvider;
        }

        public async Task HandleAsync(AddGroupCommand command)
        {
            var language1Type = (LanguageEnum)command.Language1;
            var language2Type = (LanguageEnum)command.Language2;
            var time = timeProvider.GetTime();

            var group = Group.Create(command.UserId, command.Name, language1Type, language2Type, time);
            foreach(var item in command.Words){
                var word = wordFactory.Create(0, item.Language1, item.Language2, item.Example1, item.Example2, item.Comment);
                group.AddWord(word);
            }
            await groupRepository.SaveAsync(group);
        }
    }
}