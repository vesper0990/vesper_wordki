using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Wordki.Core;
using Wordki.Core.Repositories;
using Wordki.Infrastructure.DTO;

namespace Wordki.Infrastructure.Services
{
    public class WordService : IWordService
    {
        private readonly IWordQueryRepository wordQueryRepository;
        private readonly IWordCommandRepository wordCommandRepository;
        private readonly IMapper mapper;

        public WordService(IWordQueryRepository wordQueryRepository, IWordCommandRepository wordCommandRepository,  IMapper mapper)
        {
            this.wordCommandRepository = wordCommandRepository;
            this.wordQueryRepository = wordQueryRepository;
            this.mapper = mapper;
        }

        public async Task<WordDTO> AddAsync(WordDTO wordDto, long userId)
        {
            var word = mapper.Map<WordDTO, Word>(wordDto);
            await wordCommandRepository.AddAsync(word);
            return mapper.Map<Word, WordDTO>(word);
        }

        public async Task<IEnumerable<WordDTO>> AddAllAsync(IEnumerable<WordDTO> wordsDto, long userId)
        {
            var words = mapper.Map<IEnumerable<WordDTO>, IEnumerable<Word>>(wordsDto);
            await wordCommandRepository.AddAllAsync(words);
            return mapper.Map<IEnumerable<Word>, IEnumerable<WordDTO>>(words);
        }

        public async Task UpdateAsync(WordDTO wordDto){
            var word = mapper.Map<WordDTO, Word>(wordDto);
            await wordCommandRepository.UpdateAsync(word);
        }

        public async Task UpdateAllAsync(IEnumerable<WordDTO> wordsDto){
            var words = mapper.Map<IEnumerable<WordDTO>, IEnumerable<Word>>(wordsDto);
            await wordCommandRepository.UpdateAllAsync(words);
        }

        public async Task RemoveAsync(long id){
            await wordCommandRepository.RemoveAsync(id);
        }


    }
}
