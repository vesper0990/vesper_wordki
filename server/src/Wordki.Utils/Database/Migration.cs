using Microsoft.Extensions.Options;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Threading.Tasks;
using System.IO;
using System.Linq;

namespace Wordki.Utils.Database
{
    public class ConnectionSettings
    {
        public string Host { get; set; }
        public uint Port { get; set; }
        public string Database { get; set; }
        public string UserId { get; set; }
        public string Password { get; set; }
    }

    public class MigrationSettings
    {
        public ConnectionSettings Connection { get; set; }
        public IEnumerable<string> Scripts { get; set; }
    }

    public interface IMigrationProvider
    {
        Task Migrate();
    }

    public class MigrationProvider : IMigrationProvider
    {
        private static readonly string MigrationTableName = "Migrations";
        private readonly MigrationSettings migrationSettings;

        public MigrationProvider(IOptions<MigrationSettings> migrationSettings)
        {
            this.migrationSettings = migrationSettings.Value;
        }

        public async Task Migrate()
        {
            MySqlConnection dbConnection = null;
            MySqlTransaction transaction = null;
            try
            {
                var connectionStringBuilder = new MySqlConnectionStringBuilder
                {
                    Server = migrationSettings.Connection.Host,
                    Port = migrationSettings.Connection.Port,
                    Database = migrationSettings.Connection.Database,
                    UserID = migrationSettings.Connection.UserId,
                    Password = migrationSettings.Connection.Password
                };
                dbConnection = new MySqlConnection(connectionStringBuilder.ConnectionString);
                await dbConnection.OpenAsync();
                transaction = await dbConnection.BeginTransactionAsync();

                if (!(await MigrationTableExists(dbConnection)))
                {
                    await CreateMigrationTable(dbConnection);
                }

                var migrations = await GetMigrations(dbConnection);

                foreach (var scripts in migrationSettings.Scripts)
                {
                    StreamReader reader = new StreamReader(scripts);
                    var scriptContent = await reader.ReadToEndAsync();
                    var migration = new Migration
                    {
                        Identificator = scripts,
                        Script = scriptContent,
                        Rollback = string.Empty,
                    };
                    if (!migrations.Any(x => x.Identificator.Equals(migration.Identificator)))
                    {
                        await ExecuteMigration(dbConnection, migration);
                    }
                }

            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                await transaction.RollbackAsync();
                throw;
            }
        }

        private async Task<bool> MigrationTableExists(DbConnection connection)
        {
            using (var command = connection.CreateCommand())
            {
                command.CommandText = $"SHOW TABLES LIKE '{MigrationTableName}'";
                var reader = await command.ExecuteReaderAsync();
                return reader.Read() && reader.HasRows;
            }
        }

        private static readonly string CreateMigrationSql = $@"
CREATE TABLE `{MigrationTableName}` (
	`id`                    INT UNIQUE AUTO_INCREMENT NOT NULL,
    `executionDate`         DATETIME NOT NULL,
    `identificator`         TEXT NOT NULL,
    `scriptContent`         TEXT NOT NULL,
    `rollback`              TEXT NOT NULL
);";

        private async Task CreateMigrationTable(DbConnection connection)
        {
            using (var command = connection.CreateCommand())
            {
                command.CommandText = CreateMigrationSql;
                await command.ExecuteScalarAsync();
            }
        }

        private static readonly string SelectMigrationSql = $@"
SELECT * FROM `{MigrationTableName}`
";

        private async Task<IEnumerable<Migration>> GetMigrations(DbConnection connection)
        {
            using (var command = connection.CreateCommand())
            {
                var migrations = new List<Migration>();
                command.CommandText = SelectMigrationSql;
                var reader = await command.ExecuteReaderAsync();
                while (reader.Read())
                {
                    migrations.Add(new Migration
                    {
                        Id = reader.GetInt32(1),
                        ExecutionTime = reader.GetDateTime(2),
                        Identificator = reader.GetString(3),
                        Script = reader.GetString(4),
                        Rollback = reader.GetString(5)
                    });
                };
                return migrations;
            }
        }


        private static readonly string AddMigrationSql = $@"
INSERT INTO `{MigrationTableName}` (`executionDate`, `identificator`, `scriptContent`, `rollback`) 
VALUES (@ExecutionDate, @Identificator, @ScriptContent, @Rollback)
";

        private async Task AddMigration(DbConnection connection,
            string identificator,
            string scriptContent,
            string rollback)
        {
            using (var command = connection.CreateCommand())
            {
                command.CommandText = AddMigrationSql;

                DbParameter parameter = command.CreateParameter();
                parameter.ParameterName = "@ExecutionDate";
                parameter.DbType = DbType.DateTime;
                parameter.Direction = ParameterDirection.Input;
                parameter.Value = DateTime.Now;
                command.Parameters.Add(parameter);

                parameter = command.CreateParameter();
                parameter.ParameterName = "@Identificator";
                parameter.DbType = DbType.String;
                parameter.Direction = ParameterDirection.Input;
                parameter.Value = identificator;
                command.Parameters.Add(parameter);

                parameter = command.CreateParameter();
                parameter.ParameterName = "@ScriptContent";
                parameter.DbType = DbType.String;
                parameter.Direction = ParameterDirection.Input;
                parameter.Value = scriptContent;
                command.Parameters.Add(parameter);

                parameter = command.CreateParameter();
                parameter.ParameterName = "@Rollback";
                parameter.DbType = DbType.String;
                parameter.Direction = ParameterDirection.Input;
                parameter.Value = rollback;
                command.Parameters.Add(parameter);

                await command.ExecuteNonQueryAsync();
            }
        }

        private static readonly string RemoveMigrationSql = $@"
DELETE FROM `{MigrationTableName}` 
WHERE `Identificator` = @Identificator;";

        private async Task RemoveMigration(DbConnection dbConnection, string identificator)
        {
            using (var command = dbConnection.CreateCommand())
            {
                command.CommandText = RemoveMigrationSql;

                DbParameter parameter = command.CreateParameter();
                parameter.ParameterName = "@Identificator";
                parameter.DbType = DbType.DateTime;
                parameter.Direction = ParameterDirection.Input;
                parameter.Value = identificator;
                command.Parameters.Add(parameter);

                await command.ExecuteNonQueryAsync();
            }
        }

        private async Task<bool> ExecuteMigration(DbConnection dbConnection, Migration migration)
        {
            using (var command = dbConnection.CreateCommand())
            {
                command.CommandText = migration.Script;
                await command.ExecuteNonQueryAsync();
            }
            await AddMigration(dbConnection, migration.Identificator, migration.Script, migration.Rollback);
            return true;
        }

        private async Task<bool> RollbackMigration(DbConnection dbConnection, Migration migration)
        {
            using (var command = dbConnection.CreateCommand())
            {
                command.CommandText = migration.Rollback;
                await command.ExecuteNonQueryAsync();
            }
            await AddMigration(dbConnection, migration.Identificator, migration.Script, migration.Rollback);
            return true;
        }

    }

    public class Migration
    {
        public int Id { get; set; }
        public DateTime ExecutionTime { get; set; }
        public string Identificator { get; set; }
        public string Script { get; set; }
        public string Rollback { get; set; }
    }
}
