using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Wordki.Utils.Dapper;
using Wordki.Utils.Queries;

namespace Wordki.Queries.GetWordsFromGroup
{
    public class GetWordsFromGroupQueryHandler : IQueryManyHandler<GetWordsFromGroupQuery, WordFromGroupDto>
    {
        private readonly IDbConnectionProvider dbConnection;

        public GetWordsFromGroupQueryHandler(IDbConnectionProvider dbConnection)
        {
            this.dbConnection = dbConnection;
        }

        public async Task<IEnumerable<WordFromGroupDto>> HandleAsync(GetWordsFromGroupQuery query)
        {
            var param = new
            {
                groupId = query.GroupId
            };
            var wordDic = new Dictionary<long, WordFromGroupDto>();
            using(var connection = await dbConnection.Connect())
            {
                var result = (await connection.GetAsync<WordFromGroupDto, ResultFromGroupDto, WordFromGroupDto>(sql, param, (word, repeat) => {
                    WordFromGroupDto wordEntry;
                    if(!wordDic.TryGetValue(word.WordId, out wordEntry)){
                        wordEntry = word;
                        wordDic.Add(word.WordId, word);
                    }

                    wordEntry.Repeats.Add(repeat);
                    return wordEntry;
                }, "Result")).Distinct();
                return result;
            }
        }

        private readonly string sql = $@"
SELECT
w.id                as WordId,
w.language1         as Language1,
w.language2         as Language2,
w.example1          as Example1,
w.example2          as Example2,
w.drawer            as Drawer,
w.isVisible         as isVisible,
w.nextRepeat        as NextRepeat,
w.creationDate      as CreationDate,

r.result            as Result,
r.date              as Date

FROM words w
LEFT JOIN repeats r ON r.wordId = w.id
JOIN groups2 g on g.id = w.groupId
WHERE g.id = @groupId";
    }
}
