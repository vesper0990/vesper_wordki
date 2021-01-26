using System;
using System.Collections.Generic;

namespace Wordki.Api.Domain
{
    public class Group
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public int FrontLanguage { get; set; }
        public int BackLanguage { get; set; }
        public DateTime GroupCreationDate { get; set; }
        public User Owner { get; set; }
        public IList<Card> Cards { get; set; }

        public Group()
        {
            Cards = new List<Card>();
        }
    }
}
