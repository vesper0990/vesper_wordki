using MediatR;

namespace Wordki.Api.Featuers.Group.Add
{
    public class AddGroupCommand : IRequest<long>
    {
        public long UserId { get; set; }
        public string Name { get; set; }
        public int Language1 { get; set; }
        public int Language2 { get; set; }
    }
}
