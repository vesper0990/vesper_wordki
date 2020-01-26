using Wordki.Utils.Queries;

namespace Wordki.Queries.GetGroup
{
    public class GetGroupDto : IDto
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public int Lanugage1 { get; set; }
        public int Language2 { get; set; }
    }
}
