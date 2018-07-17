using System.Collections.Generic;
using System.Threading.Tasks;
using Wordki.Infrastructure.DTO;

namespace Wordki.Infrastructure.Services
{
    public interface IResultService
    {
        Task<IEnumerable<ResultDTO>> GetAllAsync();
        Task<IEnumerable<ResultDTO>> AddAllAsync(IEnumerable<ResultDTO> resultsDto, long userId);
    }
}
