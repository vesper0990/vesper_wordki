namespace Wordki.Api.Featuers.Card.Dto
{
    public abstract class BaseDto {
        public long Id{ get; set; }
        public string GroupName{ get; set; }
        public int Language1{ get; set; }
        public int Language2{ get; set; }
        public SideDto Heads{ get; set; }
        public SideDto Tails{ get; set; }
    }
}