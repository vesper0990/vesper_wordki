using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Wordki.Utils.Dapper;
using Wordki.Utils.HttpContext;
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
                UserId = query.UserId
            };

            using(var connection = await dbConnection.Connect())
            {
                return await connection.GetAsync<GetGroupsDto>(Sql, param);
            }
        }

        private readonly string Sql = $@"
SELECT 
    id,
    name,
    language1,
    language2
FROM groups
WHERE userId = @UserId";
    }
}
