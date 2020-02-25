using System;
using Wordki.Utils.Domain;

public class RepeatDto : IDto
{
    public long Id { get; set; }
    public long WordId { get; set; }
    public DateTime DateTime { get; set; }
    public int Result { get; set; }
    public bool NeedUpdate { get; set; }
}