using System;
using System.Threading.Tasks;
using Wordki.Core.Dtos;
using Wordki.Utils.Dapper;
using Wordki.Utils.Domain;

namespace Wordki.Core.Data
{
    public interface IWordRepository
    {
        Task<Word> GetWordAsync(long wordId);
        Task SaveAsync(Word word);
    }

    public class WordRepository : IWordRepository
    {
        private readonly IDbConnectionProvider dbConnection;
        private readonly IMapper<WordDto, Word> mapper;

        public WordRepository(IDbConnectionProvider dbConnection, IMapper<WordDto, Word> mapper)
        {
            this.dbConnection = dbConnection;
            this.mapper = mapper;
        }

        public async Task<Word> GetWordAsync(long wordId)
        {
            WordDto dto = null;
            var param = new {
                wordId = wordId,
            };
            using (var conneciton = await dbConnection.Connect())
            {
                await conneciton.GetAsync<WordDto, RepeatDto, WordDto>(getWordSql, param, (word, repeat) =>
                {
                    if (dto == null)
                    {
                        dto = word;
                    }
                    if(repeat != null)
                    {
                        dto.Repeats.Add(repeat);
                    }
                    return dto;
                }, "RepeatId");
            }
            return mapper.Map(dto);
        }


        private readonly string getWordSql = $@"
SELECT 
w.id as WordId,
w.groupId as GroupId,
w.language1 as WordLanguage1,
w.language2 as WordLanguage2,
w.example1 as Example1,
w.example2 as Example2,
w.comment as Comment,
w.drawer as Drawer,
w.isVisible as IsVisible,

r.id as RepeatId,
r.wordId as WordId,
r.dateTime as DateTime,
r.result as Result

FROM words w
LEFT JOIN repeats r ON w.id = r.wordId
WHERE w.id = @wordId";


        public Task SaveAsync(Word word)
        {
            return null;
        }

        private readonly string updateWordSql = $@"

        ";


    }    
}
