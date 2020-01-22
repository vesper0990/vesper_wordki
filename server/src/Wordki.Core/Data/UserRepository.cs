using Dapper;
using System;
using System.Data;
using System.Threading.Tasks;
using Wordki.Core.Dtos;
using Wordki.Utils.Dapper;
using Wordki.Utils.Domain;

namespace Wordki.Core.Data
{
    public interface IUserRepository
    {
        Task<bool> IsExists(string name);

        Task<User> GetUserAsync(long id);
        Task<User> GetUserAsync(string name);
        Task<User> GetUserAsync(string name, string password);

        Task<long> SaveAsync(User user);
    }

    public class UserRepository : IUserRepository
    {
        private readonly IDbConnectionProvider dbConnection;
        private readonly IMapper<UserDto, User> userMapper;

        public UserRepository(IDbConnectionProvider dbConnection, IMapper<UserDto, User> userMapper)
        {
            this.dbConnection = dbConnection;
            this.userMapper = userMapper;
        }

        public async Task<bool> IsExists(string name)
        {
            var condition = " WHERE name = @name";
            var sql = generalSelectSql + condition;
            var param = new
            {
                name,
            };

            using var connection = await dbConnection.Connect();
            var dto = await connection.GetSingleAsync<UserDto>(sql, param);
            return dto != null;
        }


        private readonly string generalSelectSql = $@"
SELECT 
id AS {nameof(UserDto.Id)},
name AS {nameof(UserDto.Name)},
password AS {nameof(UserDto.Password)},
creationDate AS {nameof(UserDto.CreationDate)},
lastLoginDate AS {nameof(UserDto.LastLoginDate)}
FROM users";

        public async Task<User> GetUserAsync(long id)
        {
            var condition = " WHERE id = @id";
            var sql = generalSelectSql + condition;

            var param = new DynamicParameters();
            param.Add("id", id, DbType.Int64);

            using var connection = await dbConnection.Connect();
            var dto = await connection.GetSingleAsync<UserDto>(sql, param);
            return userMapper.Map(dto);
        }

        public async Task<User> GetUserAsync(string name)
        {
            var condition = " WHERE name = @name";
            var sql = generalSelectSql + condition;
            var param = new
            {
                name,
            };

            using var connection = await dbConnection.Connect();
            var dto = await connection.GetSingleAsync<UserDto>(sql, param);
            return userMapper.Map(dto);
        }

        public async Task<User> GetUserAsync(string name, string password)
        {
            var condition = " WHERE name = @name AND password = @password";
            var sql = generalSelectSql + condition;
            var param = new
            {
                name,
                password
            };

            using var connection = await dbConnection.Connect();
            var dto = await connection.GetSingleAsync<UserDto>(sql, param);
            return userMapper.Map(dto);
        }

        public async Task<long> SaveAsync(User user)
        {
            long id = user.Id;
            if (id == 0)
            {
                id = await InsertAsync(user);
            }
            else
            {
                await UpdateAsync(user);
            }
            return id;
        }

        private readonly string insertSql = $@"
INSERT INTO users (name, password, creationDate) VALUES (@name, @password, @creationDate);
SELECT LAST_INSERT_ID();";

        private async Task<long> InsertAsync(User user)
        {
            var param = new DynamicParameters();
            param.Add("name", user.Name, DbType.String);
            param.Add("password", user.Password, DbType.String);
            param.Add("creationDate", user.CreationDate, DbType.Date);
            using (var connection = await dbConnection.Connect())
            {
                return await connection.ExecuteScalar(insertSql, param);
            }
        }

        private readonly string updateSql = $@"
UPDATE users SET
password = @password,
lastLoginDate = @lastLoginDate
WHERE
id = @id";

        private async Task UpdateAsync(User user)
        {
            var param = new DynamicParameters();
            param.Add("id", user.Id, DbType.Int64);
            param.Add("password", user.Password, DbType.String);
            param.Add("lastLoginDate", user.LastLoginDate, DbType.DateTime);
            using var connection = await dbConnection.Connect();
            await connection.Execute(updateSql, param);
        }


    }
}
