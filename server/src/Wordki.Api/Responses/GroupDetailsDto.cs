using System;

namespace Wordki.Api.Responses
{
    public class GroupDetailsDto
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public int LanguageFront { get; set; }
        public int LanguageBack { get; set; }
        public int CardsCount { get; set; }
        public int RepeatsCount { get; set; }
        public DateTime CreationDate { get; set; }
    }
}