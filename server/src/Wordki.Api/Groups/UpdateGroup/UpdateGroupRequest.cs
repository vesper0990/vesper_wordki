namespace Wordki.Api.Groups.UpdateGroup
{
    public class UpdateGroupRequest
    {
        public long GroupId { get; set; }
        public string GroupName { get; set; }
        public int Language1 { get; set; }
        public int Language2 { get; set; }
    }
}