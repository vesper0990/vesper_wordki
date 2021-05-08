using System;

namespace Wordki.Api.Responses
{
    public class CardDetailsDto
    {
        public long Id { get; set; }
        public SideDetailsDto Front { get; set; }
        public SideDetailsDto Back { get; set; }
    }
}