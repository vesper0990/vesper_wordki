using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Wordki.Core;
using Wordki.Core.Repositories;
using Wordki.Infrastructure.DTO;

namespace Wordki.Infrastructure.Services
{
    public class WordService : IWordService
    {
        private readonly IWordRepository wordRepository;
        private readonly IMapper mapper;

        public WordService(IWordRepository wordRepository, IMapper mapper)
        {
            this.wordRepository = wordRepository;
            this.mapper = mapper;
        }

        public async Task<WordDTO> AddAsync(WordDTO wordDto, long userId)
        {
            var word = mapper.Map<WordDTO, Word>(wordDto);
            await wordRepository.AddAsync(word);
            return mapper.Map<Word, WordDTO>(word);
        }

        public async Task<IEnumerable<WordDTO>> AddAllAsync(IEnumerable<WordDTO> wordsDto, long userId)
        {
            var words = mapper.Map<IEnumerable<WordDTO>, IEnumerable<Word>>(wordsDto);
            await wordRepository.AddAllAsync(words);
            return mapper.Map<IEnumerable<Word>, IEnumerable<WordDTO>>(words);
        }

        public async Task UpdateAsync(WordDTO wordDto){
            var word = mapper.Map<WordDTO, Word>(wordDto);
            await wordRepository.UpdateAsync(word);
        }

        public async Task UpdateAllAsync(IEnumerable<WordDTO> wordsDto){
            var words = mapper.Map<IEnumerable<WordDTO>, IEnumerable<Word>>(wordsDto);
            await wordRepository.UpdateAllAsync(words);
        }

        public async Task RemoveAsync(long id){
            await wordRepository.RemoveAsync(id);
        }


    }
}
