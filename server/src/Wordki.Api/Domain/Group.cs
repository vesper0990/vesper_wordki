using System;
using System.Collections.Generic;

namespace Wordki.Api.Domain
{
    public class Group
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public int GroupLanguage1 { get; set; }
        public int GroupLanguage2 { get; set; }
        public DateTime GroupCreationDate { get; set; }
        public User User { get; set; }
        public IList<Card> Words { get; set; }

        public Group()
        {
            Words = new List<Card>();
        }
    }
}
