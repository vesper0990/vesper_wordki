using Wordki.Utils.Queries;

namespace Wordki.Queries.GetNextWords
{
    public class GetNextWordsDto : IDto
    {
        public long Id { get; set; }
        public string Language1 { get; set; }
        public string Language2 { get; set; }
        public int Drawer { get; set; }
    }
}
