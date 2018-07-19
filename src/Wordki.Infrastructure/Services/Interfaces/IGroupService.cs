using System.Collections.Generic;
using System.Threading.Tasks;
using Wordki.Infrastructure.DTO;

namespace Wordki.Infrastructure.Services
{
    public interface IGroupService
    {
        Task<IEnumerable<GroupDTO>> GetItemsAsync(long userId);
        Task<GroupDetailsDTO> GetDetailsAsync(long groupId);
        Task<GroupDetailsDTO> AddAsync(GroupDetailsDTO group, long userId);
        Task UpdateAsync(GroupDTO groupDto);
        Task RemoveAsync(long id);
    }
}
