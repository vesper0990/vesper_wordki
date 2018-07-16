using System.Collections.Generic;
using System.Threading.Tasks;
using Wordki.Infrastructure.DTO;

namespace Wordki.Infrastructure.Services
{
    public interface IGroupService
    {
        Task<IEnumerable<GroupDTO>> GetGroupItemsAsync(long userId);
        Task<GroupDetailsDTO> GetGroupDetailsAsync(long groupId);
        Task<GroupDTO> AddGroupAsync(GroupDTO group, long userId);
    }
}
