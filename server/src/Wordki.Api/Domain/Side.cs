using System.ComponentModel.DataAnnotations.Schema;

namespace Wordki.Api.Domain
{
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
}
