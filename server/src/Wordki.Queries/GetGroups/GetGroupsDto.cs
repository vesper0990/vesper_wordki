using Wordki.Utils.Queries;

namespace Wordki.Queries.GetGroups
{
    public class GetGroupsDto : IDto
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public int Language1 { get; set; }
        public int Language2 { get; set; }
        public int WordsCount { get; set; }
        public int RepeatsCount { get; set; }
        public double AverageDrawer { get; set; }
    }
}
