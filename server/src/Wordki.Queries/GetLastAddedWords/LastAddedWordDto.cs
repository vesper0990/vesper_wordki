using System;
using Wordki.Utils.Queries;

namespace Wordki.Queries.GetLastAddedWords
{
    public class LastAddedWordDto : IDto
    {
        public string GroupName { get; set; }
        public int GroupLanguage1 { get; set; }
        public int GroupLanguage2 { get; set; }
        public long Id { get; set; }
        public string Language1 { get; set; }
        public string Language2 { get; set; }
        public string Example1 { get; set; }
        public string Example2 { get; set; }
        public int Drawer { get; set; }
        public DateTime CreationDate { get; set; }
        public int RepeatsCount { get; set; }
        public DateTime LastRepeat { get; set; }
    }
}
