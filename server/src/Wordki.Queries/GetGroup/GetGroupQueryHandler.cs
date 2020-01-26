using System.Threading.Tasks;
using Wordki.Utils.Dapper;
using Wordki.Utils.Queries;

namespace Wordki.Queries.GetGroup
{
    public class GetGroupQueryHandler : IQueryHandler<GetGroupQuery, GetGroupDto>
    {
        private readonly IDbConnectionProvider dbConnection;

        public GetGroupQueryHandler(IDbConnectionProvider dbConnection)
        {
            this.dbConnection = dbConnection;
        }

        public async Task<GetGroupDto> HandleAsync(GetGroupQuery query)
        {
            var param = new
            {
                groupId = query.GroupId
            };
            using (var connection = await dbConnection.Connect())
            {
                return await connection.GetSingleAsync<GetGroupDto>(sql, param);
            }
        }

        private readonly string sql = $@"
SELECT
    g.id as Id, 
    g.name as Name,
    g.language1 as Language1, 
    g.language2 as Language2
FROM groups g
WHERE g.id = @groupId";
    }
}
