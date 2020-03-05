using System.Collections.Generic;
using Wordki.Core.Dtos;
using Wordki.Utils.Domain;

namespace Wordki.Core.Mappers
{
    public class GroupMapper : IMapper<GroupDto, Group>
    {
        private readonly IMapper<WordDto, Word> wordMapper;

        public GroupMapper(IMapper<WordDto, Word> wordMapper)
        {
            this.wordMapper = wordMapper;
        }

        public Group Map(GroupDto dto)
        {
            if (dto == null) return null;
            var language1 = (LanguageEnum)dto.GroupLanguage1;
            var language2 = (LanguageEnum)dto.GroupLanguage2;

            var group = Group.Restore(
                dto.GroupId,
                dto.UserId,
                dto.Name,
                language1,
                language2,
                dto.GroupCreationDate,
                new List<Word>());
            foreach (var word in dto.Words)
            {
                group.AddWord(wordMapper.Map(word));
            }
            return group;
        }
    }
}
