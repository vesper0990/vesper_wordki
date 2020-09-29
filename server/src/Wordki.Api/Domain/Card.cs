using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Wordki.Api.Domain
{
    public class Card
    {
        public long Id { get; set; }
        public Word CardSide1 { get; set; }
        public Word CardSide2 { get; set; }
        public string Comment { get; set; }
        public Drawer Drawer { get; set; }
        public bool IsVisible { get; set; }
        public DateTime WordCreationDate { get; set; }
        public DateTime NextRepeat { get; set; }
        public Group Group { get; set; }
        public IList<Repeat> Repeats { get;  }

        public Card()
        {
            Repeats = new List<Repeat>();
        }
    }

    public class Drawer
    {
        public int Value { get; set; }

        private Drawer(int value)
        {
            Value = value;
        }

        public static Drawer Create(int value)
        {
            if (value < 1 && value > 5)
            {
                throw new Exception();
            }
            return new Drawer(value);
        }
    }

    [ComplexType]
    public class Word
    {
        public string Value { get; set; }
        public string Example { get; set; }
    }
}
