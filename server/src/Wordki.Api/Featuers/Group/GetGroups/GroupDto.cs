namespace Wordki.Api.Featuers.Group.GetGroups
{
    public class GroupDto
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public int Language1 { get; set; }
        public int Language2 { get; set; }
        public int CardsCount { get; set; }
    }
}
