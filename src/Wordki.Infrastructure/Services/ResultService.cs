using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Wordki.Core;
using Wordki.Core.Repositories;
using Wordki.Infrastructure.DTO;

namespace Wordki.Infrastructure.Services
{

    public class ResultService : IResultService 
    {

        private readonly IResultRepository resultRepository;
        private readonly IMapper mapper;

        public ResultService(IResultRepository resultRepository, IMapper mapper)
        {
            this.resultRepository = resultRepository;
            this.mapper = mapper;
        }

        public async Task<IEnumerable<ResultDTO>> AddAllAsync(IEnumerable<ResultDTO> resultsDto, long userId)
        {
            var results = mapper.Map<IEnumerable<ResultDTO>, IEnumerable<Result>>(resultsDto);
            foreach (var result in results)
            {
                result.UserId = userId;
            }
            await resultRepository.AddAllAsync(results);
            return mapper.Map<IEnumerable<Result>, IEnumerable<ResultDTO>>(results);
        }

        public async Task<IEnumerable<ResultDTO>> GetAllAsync()
        {
            return mapper.Map<IEnumerable<Result>, IEnumerable<ResultDTO>>(await resultRepository.GetAllAsync());
        }
    }
}