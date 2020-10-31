using MediatR;

namespace Wordki.Api.Featuers.Group.Update
{
    public class UpdateGroupCommand : IRequest
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public int Language1 { get; set; }
        public int Language2 { get; set; }
    }
}
