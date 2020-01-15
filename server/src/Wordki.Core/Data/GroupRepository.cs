using System.Threading.Tasks;
using Wordki.Utils.Dapper;

namespace Wordki.Core.Data
{
    public interface IGroupRepository
    {
        Task SaveAsync(Group group);
    }

    public class GroupRepository : IGroupRepository
    {
        private readonly IDbConnectionProvider dbConnection;

        public GroupRepository(IDbConnectionProvider dbConnection)
        {
            this.dbConnection = dbConnection;
        }

        public async Task SaveAsync(Group group)
        {
            if (group.Id == 0)
            {
                await InsertAsync(group);
            }
            else
            {
                await UpdateAsync(group);
            }
        }

        private readonly string insertSql = $@"
INSERT INTO groups (userId, name, language1, language2) 
VALUES (@userId, @name, @language1, @language2)";
        private async Task InsertAsync(Group group)
        {
            var param = new
            {
                userId = group.UserId,
                name = group.Name,
                language1 = group.Language1,
                language2 = group.Language2
            };
            using (var connection = await dbConnection.Connect())
            {
                await connection.Execute(insertSql, param);
            }
        }

        private readonly string updateSql = $@"
UPDATE groups SET
name = @name,
language1 = @language1,
language2 = @language2
WHERE
id = @id";

        private async Task UpdateAsync(Group group)
        {
            var param = new
            {
                id = group.Id,
                name = group.Name,
                language1 = group.Language1,
                language2 = group.Language2
            };
            using (var connection = await dbConnection.Connect())
            {
                await connection.Execute(updateSql, param);
            }
        }
    }
}
