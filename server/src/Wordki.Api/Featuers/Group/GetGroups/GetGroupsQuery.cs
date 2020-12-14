using MediatR;
using System.Collections.Generic;
using Wordki.Api.Responses;

namespace Wordki.Api.Featuers.Group.GetGroups
{
    public class GetGroupsQuery : IRequest<IEnumerable<GroupDto>> { }
}
