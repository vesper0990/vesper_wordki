using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Wordki.Api.Domain
{
    [ComplexType]
    public class State
    {
        public Drawer Drawer { get; set; }
        public DateTime NextRepeat { get; set; }
        public bool IsVisible { get; set; }

        public static State New() =>
            new State
            {
                Drawer = Drawer.Create(0),
                NextRepeat = new DateTime(0),
                IsVisible = false
            };
    }
}
