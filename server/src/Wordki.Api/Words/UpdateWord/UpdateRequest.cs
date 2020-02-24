namespace Wordki.Api.Words.UpdateWord
{
    public class UpdateRequest
    {
        public long GroupId { get; set; }
        public long WordId { get; set; }
        public string Language1 { get; set; }
        public string Language2 { get; set; }
        public bool IsVisible { get; set; }
    }
}
