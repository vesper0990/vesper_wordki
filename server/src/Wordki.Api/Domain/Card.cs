using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Wordki.Api.Domain
{
    public class Card
    {
        public long Id { get; set; }
        public Side Heads { get; set; }
        public Side Tails { get; set; }
        public string Comment { get; set; }
        public bool IsVisible { get; set; }
        public DateTime WordCreationDate { get; set; }
        public Group Group { get; set; }
        public IList<Repeat> Repeats { get; }

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
    public class Side
    {
        public string Value { get; set; }
        public string Example { get; set; }
        public State State { get; set; }

        public static Side New(string value, string example) =>
            new Side
            {
                Value = value,
                Example = example,
                State = State.New()
            };
    }

    [ComplexType]
    public class State
    {
        public Drawer Drawer { get; set; }
        public DateTime NextRepeat { get; set; }

        public static State New() =>
            new State
            {
                Drawer = Drawer.Create(0),
                NextRepeat = new DateTime(0)
            };
    }
}
