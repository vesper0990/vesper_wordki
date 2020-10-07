using MediatR;
using System.Collections.Generic;
using Wordki.Api.Domain;

namespace Wordki.Api.Featuers.Group.Add
{
    public class AddGroupCommand : IRequest<long>
    {
        public long UserId { get; set; }
        public string Name { get; set; }
        public int Language1 { get; set; }
        public int Language2 { get; set; }
        public IEnumerable<Card> Words { get; set; } = new Card[0];
    }

    public class Card
    {
        public Word CardSide1 { get; set; }
        public Word CardSide2 { get; set; }
        public string Comment { get; set; }
        public bool IsVisible { get; set; }
    }
}
