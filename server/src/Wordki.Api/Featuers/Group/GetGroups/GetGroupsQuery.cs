using MediatR;
using System.Collections.Generic;

namespace Wordki.Api.Featuers.Group.GetGroups
{
    public class GetGroupsQuery : IRequest<IEnumerable<GroupDto>>
    {
    }
}
