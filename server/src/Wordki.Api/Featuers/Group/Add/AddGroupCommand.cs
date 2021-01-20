using MediatR;
using System.Collections.Generic;

namespace Wordki.Api.Featuers.Group.Add
{
    public class AddGroupCommand : IRequest<long>
    {
        public string Name { get; set; }
        public int LanguageFront { get; set; }
        public int LanguageBack { get; set; }
        public IEnumerable<Card> Cards { get; set; } = new Card[0];
    }

    public class Card
    {
        public Side Front { get; set; }
        public Side Back { get; set; }
    }

    public class Side
    {
        public string Value { get; set; }
        public string Example { get; set; }
    }
}
