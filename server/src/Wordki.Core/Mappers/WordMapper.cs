using Wordki.Core.Dtos;
using Wordki.Utils.Domain;

namespace Wordki.Core.Mappers
{
    public class WordMapper : IMapper<WordDto, Word>
    {
        public Word Map(WordDto dto)
        {
            var drawer = Drawer.Restore(dto.Drawer);
            return Word.Restore(
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
        }
    }
}
