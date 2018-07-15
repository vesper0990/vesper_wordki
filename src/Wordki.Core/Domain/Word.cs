using System;

namespace Wordki.Core
{
    public class Word
    {
        public long Id { get; set; }
        public long GroupId { get; set; }
        public Group Group { get; set; }
        public long UserId { get; set; }
        public string Language1 { get; set; }
        public string Language2 { get; set; }
        public string Language1Example { get; set; }
        public string Language2Example { get; set; }
        public byte Drawer { get; set; }
        public bool IsVisible { get; set; }
        public int State { get; set; }
        public bool IsSelected { get; set; }
        public ushort RepeatingCounter { get; set; }
        public DateTime LastRepeating { get; set; }
        public string Comment { get; set; }
        public DateTime LastChange { get; set; }

        public Word()
        {
            Id = 0;
            Language1 = string.Empty;
            Language2 = string.Empty;
            Language1Example = string.Empty;
            Language2Example = string.Empty;
            IsVisible = true;
            State = int.MaxValue;
            Comment = string.Empty;
        }
    }
}
