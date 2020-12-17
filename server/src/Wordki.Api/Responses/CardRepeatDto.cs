namespace Wordki.Api.Responses
{
    public class CardRepeatDto
    {
        public long Id { get; set; }
        public SideRepeatDto Question { get; set; }
        public SideRepeatDto Answer { get; set; }
    }
}