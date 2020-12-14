using System;

namespace Wordki.Api.Responses
{
    public class SideDetailsDto
    {
        public string Value { get; set; }
        public string Example { get; set; }
        public int Drawer { get; set; }
        public int Language { get; set; }
        public int RepeatCounts { get; set; }
        public bool IsVisible { get; set; }
        public DateTime NextRepeat { get; set; }
    }
}