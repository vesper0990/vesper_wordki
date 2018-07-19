using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using Wordki.Core.Enums;

namespace Wordki.Core
{
    public class Group
    {
        public long Id { get; set; }
        public long UserId { get; set; }
        [JsonIgnore]
        public User User { get; set; }
        public string Name { get; set; }
        public LanguageType Language1 { get; set; }
        public LanguageType Language2 { get; set; }
        public int State { get; set; }
        public DateTime CreationDate { get; set; }
        public DateTime LastChange { get; set; }
        public IList<Word> Words { get; set; }
        public IList<Result> Results { get; set; }
        

        public Group()
        {
            Id = 0;
            UserId = -1;
            Name = string.Empty;
            Language1 = LanguageType.Unknown;
            Language2 = LanguageType.Unknown;
            State = int.MaxValue;
            CreationDate = DateTime.Now;
            Words = new List<Word>();
            Results = new List<Result>();
        }

    }
}
