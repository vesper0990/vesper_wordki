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
            var words = new List<Word>(dto.Words.Count);
            for (int i = 0; i < dto.Words.Count; i++)
            {
                words[i] = wordMapper.Map(dto.Words[i]);
            }
            var language1 = (LanguageEnum)dto.GroupLanguage1;
            var language2 = (LanguageEnum)dto.GroupLanguage2;
            return Group.Restore(
                dto.GroupId,
                dto.UserId,
                dto.Name,
                language1,
                language2,
                dto.GroupCreationDate,
                words);
        }
    }
}
