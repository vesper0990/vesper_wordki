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

        private readonly IResultCommandRepository resultCommandRepository;
        private readonly IResultQueryRepository resultQueryRepository;
        private readonly IMapper mapper;

        public ResultService(IResultCommandRepository resultCommandRepository, IResultQueryRepository resultQueryRepository, IMapper mapper)
        {
            this.resultCommandRepository = resultCommandRepository;
            this.resultQueryRepository = resultQueryRepository;
            this.mapper = mapper;
        }

        public async Task<IEnumerable<ResultDTO>> AddAllAsync(IEnumerable<ResultDTO> resultsDto, long userId)
        {
            var results = mapper.Map<IEnumerable<ResultDTO>, IEnumerable<Result>>(resultsDto);
            foreach (var result in results)
            {
                result.UserId = userId;
            }
            await resultCommandRepository.AddAllAsync(results);
            return mapper.Map<IEnumerable<Result>, IEnumerable<ResultDTO>>(results);
        }

        public async Task<ResultDTO> AddAsync(ResultDTO resultDto, long userId)
        {
            var result = mapper.Map<ResultDTO, Result>(resultDto);
            result.UserId = userId;
            await resultCommandRepository.AddAsync(result);
            return mapper.Map<Result, ResultDTO>(result);
        }

        public async Task<IEnumerable<ResultDTO>> GetAllAsync()
        {
            return mapper.Map<IEnumerable<Result>, IEnumerable<ResultDTO>>(await resultQueryRepository.GetAllAsync());
        }
    }
}