using System.Collections.Generic;
using System.Threading.Tasks;
using Wordki.Infrastructure.DTO;

namespace Wordki.Infrastructure.Services
{
    public interface IResultService : IService
    {

        Task<IEnumerable<ResultDTO>> GetAllAsync();
        Task<ResultDTO> AddAsync(ResultDTO resultDto, long userId);
        Task<IEnumerable<ResultDTO>> AddAllAsync(IEnumerable<ResultDTO> resultsDto, long userId);
    }
}
