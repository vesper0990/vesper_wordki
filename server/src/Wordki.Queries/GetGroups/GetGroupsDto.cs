using Wordki.Utils.Queries;

namespace Wordki.Queries.GetGroups
{
    public class GetGroupsDto : IDto
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public int Language1 { get; set; }
        public int Language2 { get; set; }
    }
}
