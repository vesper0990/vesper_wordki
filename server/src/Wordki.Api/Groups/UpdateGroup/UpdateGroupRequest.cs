namespace Wordki.Api.Groups.UpdateGroup
{
    public class UpdateGroupRequest
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public int Language1 { get; set; }
        public int Language2 { get; set; }
    }
}