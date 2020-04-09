using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Wordki.Utils.Dapper;
using Wordki.Utils.Queries;

namespace Wordki.Queries.GetNextWords
{
    public class GetNextWordsForLessonQueryHandler : IQueryManyHandler<GetNextWordsForLessonQuery, GetNextWordsDto>
    {
        private readonly IDbConnectionProvider dbConnection;

        public GetNextWordsForLessonQueryHandler(IDbConnectionProvider dbConnection)
        {
            this.dbConnection = dbConnection;
        }

        public async Task<IEnumerable<GetNextWordsDto>> HandleAsync(GetNextWordsForLessonQuery query)
        {
            var param = new
            {
                count = query.Count,
                userId = query.UserId,
                offset = query.Offset,
                question = query.Question,
                answer = query.Answer
            };
            using (var connection = await dbConnection.Connect())
            {
                return await connection.GetAsync<GetNextWordsDto>(sql, param);
            }
        }

        private readonly string sql = $@"
SELECT
g.name          as GroupName,
g.language1     as GroupLanguage1,
g.language2     as GroupLanguage2,
w.id            as Id,
w.language1     as Language1,
w.language2     as Language2,
w.example1      as Example1,
w.example2      as Example2,
w.drawer        as Drawer,
w.creationDate  as CreationDate,
count(r.id)     as RepeatCount,
max(r.date)     as LastRepeat
FROM words w
JOIN groups2 g ON w.groupId = g.id
LEFT JOIN repeats r ON w.id = r.wordId
WHERE g.userId = @userId 
AND w.isVisible = 1
AND ((g.language1 = @question AND g.language2 = @answer) OR (g.language2 = @question AND g.language1 = @answer))
GROUP BY w.id, g.name
ORDER BY w.nextRepeat, w.id
LIMIT @offset, @count";
    }
}
