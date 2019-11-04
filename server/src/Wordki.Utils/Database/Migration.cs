using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Threading.Tasks;

namespace Wordki.Utils.Database
{
    public interface IMigrationProvider
    {
        Task Migrate(string host, uint port, string database, string userId, string password);
    }

    public class MigrationProvider : IMigrationProvider
    {
        private static readonly string MigrationTableName = "Migrations";
        private static readonly string CreateMigrationSql = $@"
CREATE TABLE `{MigrationTableName}` (
	`id`                INT UNIQUE AUTO_INCREMENT NOT NULL
    `executingDate`    DATE NOT NULL,
    `fileName`         TEXT NOT NULL
);";
        
        private static readonly string SelectMiggrationSql = $@"
SELECT * FROM `{MigrationTableName}`
";
        private static readonly string AddMigrationSql = $@"
INSERT INTO `{MigrationTableName}` (`executingDate`, `fileName`) 
VALUES (@ExecutingDate, @FileName)
";

        private readonly MigrationSettings settings;

        public async Task Migrate(string host, uint port, string database, string userId, string password)
        {
            try
            {
                var connectionStringBuilder = new MySqlConnectionStringBuilder
                {
                    Server = host,
                    Port = port,
                    Database = database,
                    UserID = userId,
                    Password = password
                };
                var dbConnection = new MySqlConnection(connectionStringBuilder.ConnectionString);
                await dbConnection.OpenAsync();

                if(!(await MigrationTableExists(dbConnection)))
                {
                    await CreateMigrationTable(dbConnection);
                }
            }catch(Exception e)
            {
                Console.WriteLine(e.Message);
                throw;
            }
        }

        private async Task<bool> MigrationTableExists(DbConnection connection)
        {
            using (var command = connection.CreateCommand())
            {
                command.CommandText = $"SHOW TABLES LIKE '${MigrationTableName}'";
                var reader = await command.ExecuteReaderAsync();
                return reader.HasRows;
            }
        }

        private async Task CreateMigrationTable(DbConnection connection)
        {
            using (var command = connection.CreateCommand())
            {
                command.CommandText = CreateMigrationSql;
                await command.ExecuteScalarAsync();
            }
        }

        private async Task<IEnumerable<Migration>> GetMigrations(DbConnection connection)
        {
            using (var command = connection.CreateCommand())
            {
                var migrations = new List<Migration>();
                command.CommandText = CreateMigrationSql;
                var reader = await command.ExecuteReaderAsync();
                while (reader.Read())
                {
                    migrations.Add(new Migration
                    {
                        Id = reader.GetInt32(1),
                        ExecutingTime = reader.GetDateTime(2),
                        FileName = reader.GetString(3)
                    });
                };
                return migrations;
            }
        }

        private async Task AddMigration(DbConnection connection, string fileName)
        {
            using (var command = connection.CreateCommand())
            {
                command.CommandText = AddMigrationSql;

                DbParameter parameter = command.CreateParameter();
                parameter.ParameterName = "@ExecutingDate";
                parameter.DbType = DbType.DateTime;
                parameter.Direction = ParameterDirection.Input;
                parameter.Value = DateTime.Now;
                command.Parameters.Add(parameter);

                parameter = command.CreateParameter();
                parameter.ParameterName = "@FileName";
                parameter.DbType = DbType.String;
                parameter.Direction = ParameterDirection.Input;
                parameter.Value = fileName;
                command.Parameters.Add(parameter);

                await command.ExecuteNonQueryAsync();
            }
        }
    }

    public class MigrationSettings
    {
        public string Host { get; set; }
        public uint Port { get; set; }
        public string Database { get; set; }
        public string UserId { get; set; }
        public string Password { get; set; }
    }

    public class Migration
    {
        public int Id { get; set; }
        public DateTime ExecutingTime { get; set; }
        public string FileName { get; set; }
    }
}
