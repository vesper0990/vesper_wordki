using MediatR;

namespace Wordki.Api.Featuers.Group.AddExisting
{
    public class AddExistingCommand : IRequest<long>
    {
        public long GroupId { get; set; }
    }
}