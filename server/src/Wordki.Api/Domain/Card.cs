using System;
using System.Collections.Generic;

namespace Wordki.Api.Domain
{
    public class Card
    {
        public long Id { get; set; }
        public Side Front { get; set; }
        public Side Back { get; set; }
        public DateTime CreationDate { get; set; }
        public Group Group { get; set; }
        public IList<Repeat> Repeats { get; }

        public Card()
        {
            Repeats = new List<Repeat>();
        }
    }
}
