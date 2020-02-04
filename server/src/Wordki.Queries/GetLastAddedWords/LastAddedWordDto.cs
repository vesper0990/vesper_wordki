using System;
using Wordki.Utils.Queries;

namespace Wordki.Queries.GetLastAddedWords
{
    public class LastAddedWordDto : IDto
    {
        public string Language1 { get; set; }
        public string Language2 { get; set; }
        public DateTime CreationDate { get; set; }
    }
}
