using Wordki.Core.Enums;

namespace Wordki.Infrastructure.DTO
{
    public class GroupDetailsDTO{
        public long Id{get;set;}
        public string Name{get;set;}
        public LanguageType Language1{get;set;}
        public LanguageType Language2 {get;set;}
        public IEnumerable<WordDTO> Words{get;set;}
        public IEnumerable<ResultDTO> Results{get;set;}
    }
}