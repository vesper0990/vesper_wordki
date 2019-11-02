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

        Task<User> GetUserAsync(Guid id);
        Task<User> GetUserAsync(string name);
        Task<User> GetUserAsync(string name, string password);

        Task SaveAsync(User user);
    }

    public class UserRepository : IUserRepository
    {
        private readonly IDbConnectionProvdier dbConnection;
        private readonly IMapper<UserDto, User> userMapper;

        public UserRepository(IDbConnectionProvdier dbConnection, IMapper<UserDto, User> userMapper)
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
guid AS {nameof(UserDto.Guid)},
name AS {nameof(UserDto.Name)},
password AS {nameof(UserDto.Password)},
creation_date AS {nameof(UserDto.CreationDate)},
last_login_date AS {nameof(UserDto.LastLoginDate)}
FROM Users";

        public async Task<User> GetUserAsync(Guid id)
        {
            var condition = " WHERE id = @id";
            var sql = generalSelectSql + condition;

            var param = new DynamicParameters();
            param.Add("id", Guid.NewGuid().ToByteArray(), DbType.Binary);

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

        public async Task SaveAsync(User user)
        {
            if (user.Id == null)
            {
                await InsertAsync(user);
            }
            else
            {
                await UpdateAsync(user);
            }
        }

        private readonly string insertSql = $@"
INSERT INTO Users (guid, name, password, creation_date) VALUES (@guid, @name, @password, @creationDate)";

        private async Task InsertAsync(User user)
        {
            var param = new DynamicParameters();
            param.Add("guid", Guid.NewGuid().ToByteArray(), DbType.Binary);
            param.Add("name", user.Name, DbType.String);
            param.Add("password", user.Password, DbType.String);
            param.Add("creationDate", user.CreationDate, DbType.Date);
            using var connection = await dbConnection.Connect();
                await connection.Execute(insertSql, param);
        }

        private readonly string updateSql = $@"
UPDATE Users SET
password = @password,
last_login_date = @lastLoginDate
WHERE
guid = @guid";

        private async Task UpdateAsync(User user)
        {
            var param = new DynamicParameters();
            param.Add("guid", user.Id.Value.ToByteArray(), DbType.Binary);
            param.Add("password", user.Password, DbType.String);
            param.Add("lastLoginDate", user.LastLoginDate, DbType.DateTime);
            using var connection = await dbConnection.Connect();
                await connection.Execute(updateSql, param);
        }

        
    }
}
