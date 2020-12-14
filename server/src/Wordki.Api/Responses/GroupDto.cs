namespace Wordki.Api.Responses
{
    public class GroupDto
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public int LanguageFront { get; set; }
        public int LanguageBack { get; set; }
        public int CardsCount { get; set; }
        public int RepeatsCount { get; set; }
    }
}