using System;
using System.Collections.Generic;

namespace Wordki.Api.Domain
{
    public class Lesson
    {
        public long Id { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? FinishDate { get; set; }
        public User User { get; set; }
        public IList<Repeat> Repeats { get; set; }

        public Lesson()
        {
            Repeats = new List<Repeat>();
        }
    }
}
