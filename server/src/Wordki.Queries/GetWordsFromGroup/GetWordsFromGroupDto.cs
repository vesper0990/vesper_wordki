using System;
using Wordki.Utils.Queries;

namespace Wordki.Queries.GetWordsFromGroup
{
    public class GetWordsFromGroupDto : IDto
    {
        public long Id { get; set; }
        public string Language1 { get; set; }
        public string Language2 { get; set; }
        public int Drawer { get; set; }
        public DateTime CreationDate { get; set; }
        public DateTime NextRepeat { get; set; }
        public DateTime LastRepeat { get; set; }
        public int RepeatsCount { get; set; }
    }
}
