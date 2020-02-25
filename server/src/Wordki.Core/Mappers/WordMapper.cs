using Wordki.Core.Domain;
using Wordki.Core.Dtos;
using Wordki.Utils.Domain;

namespace Wordki.Core.Mappers
{
    public class WordMapper : IMapper<WordDto, Word>
    {
        private readonly IMapper<RepeatDto, Repeat> repeatMapper;

        public WordMapper(IMapper<RepeatDto, Repeat> repeatMapper){
            this.repeatMapper = repeatMapper;
        }

        public Word Map(WordDto dto)
        {
            var drawer = Drawer.Restore(dto.Drawer);
            var word = Word.Restore(
                dto.WordId,
                dto.GroupId,
                dto.WordLanguage1,
                dto.WordLanguage2,
                dto.Example1,
                dto.Example2,
                dto.Comment,
                drawer,
                dto.IsVisible,
                dto.WordCreationDate,
                dto.NextRepeat);

                foreach(var repeatDto in dto.Repeats){
                    word.AddRepeat(repeatMapper.Map(repeatDto));
                }

            return word;
        }
    }
}
