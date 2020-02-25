using System;
using System.Collections.Generic;
using Wordki.Utils.Domain;

namespace Wordki.Core.Dtos
{
    public class WordDto : IDto
    {
        public long WordId { get; set; }
        public long GroupId { get; set; }
        public string WordLanguage1 { get; set; }
        public string WordLanguage2 { get; set; }
        public string Example1 { get; set; }
        public string Example2 { get; set; }
        public string Comment { get; set; }
        public int Drawer { get; set; }
        public bool IsVisible { get; set; }
        public DateTime WordCreationDate { get; set; }
        public DateTime NextRepeat { get; set; }
        public IList<RepeatDto> Repeats { get; }

        public WordDto()
        {
            Repeats = new List<RepeatDto>();
        }

    }
}
