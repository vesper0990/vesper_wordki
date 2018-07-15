using System.Collections.Generic;
using System.Threading.Tasks;
using Wordki.Infrastructure.DTO;

namespace Wordki.Infrastructure.Services
{
    public interface IGroupService
    {
        Task<IEnumerable<GroupDTO>> GetGroupItemsAsync(long userId);
    }
}
