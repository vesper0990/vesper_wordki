using MediatR;

namespace Wordki.Api.Featuers.Group.Delete
{
    public class DeleteGroupCommand : IRequest
    {
        public long GroupId { get; set; }
    }
}
