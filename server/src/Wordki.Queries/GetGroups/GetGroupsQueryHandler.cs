using System.Collections.Generic;
using System.Threading.Tasks;
using Wordki.Utils.Dapper;
using Wordki.Utils.Queries;

namespace Wordki.Queries.GetGroups
{
    public class GetGroupsQueryHandler : IQueryManyHandler<GetGroupsQuery, GetGroupsDto>
    {
        private readonly IDbConnectionProvider dbConnection;

        public GetGroupsQueryHandler(IDbConnectionProvider dbConnection)
        {
            this.dbConnection = dbConnection;
        }

        public async Task<IEnumerable<GetGroupsDto>> HandleAsync(GetGroupsQuery query)
        {
            var param = new
            {
                userId = query.UserId
            };

            using(var connection = await dbConnection.Connect())
            {
                return await connection.GetAsync<GetGroupsDto>(Sql, param);
            }
        }

        private readonly string Sql = $@"
SELECT
    Id,
    Name,
    Language1,
    Language2,
    COUNT(WordId)             as WordsCount,
    COUNT(CASE IsVisible WHEN TRUE THEN 1 ELSE NULL END) as VisibleWordsCount,
    sum(RepeatsCount)         as RepeatsCount,
    AVG(Drawer)               as AverageDrawer
FROM (
    SELECT
        g.id                as Id,
        g.name              as Name,
        g.language1         as Language1,
        g.language2         as Language2,
        w.id                as WordId,
        count(r.id)         as RepeatsCount,
        w.drawer            as Drawer,
        w.isVisible         as IsVisible
    FROM words w
    LEFT JOIN repeats r ON w.id = r.wordId
    LEFT JOIN groups2 g ON w.groupId =  g.id
    WHERE g.userid = @userId
    GROUP BY w.id
) t
GROUP BY Id";
    }
}
