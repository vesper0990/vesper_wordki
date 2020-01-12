using Wordki.Utils.Queries;

namespace Wordki.Queries.GetWords
{
    public class GetWordsDto : IDto
    {
        public long Id { get; set; }
        public string Language1 { get; set; }
        public string Language2 { get; set; }
        public int Drawer { get; set; }
    }
}
