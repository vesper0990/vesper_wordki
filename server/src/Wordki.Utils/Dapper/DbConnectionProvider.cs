using Microsoft.Extensions.Options;
using MySql.Data.MySqlClient;
using System.Threading.Tasks;

namespace Wordki.Utils.Dapper
{
    public interface IDbConnectionProvider
    {
        Task<IDbConnectionWrapper> Connect();
    }

    public class DbConnectionProvider : IDbConnectionProvider
    {
        private readonly DapperSettings dapperSettings;

        public DbConnectionProvider(IOptions<DapperSettings> dapperSettings)
        {
            this.dapperSettings = dapperSettings.Value;
        }

        public async Task<IDbConnectionWrapper> Connect()
        {
            Condition.MustBeDefined(dapperSettings, nameof(dapperSettings));
            Condition.MustBeDefined(dapperSettings.Host, nameof(dapperSettings.Host));
            Condition.MustBeDefined(dapperSettings.Port, nameof(dapperSettings.Port));
            Condition.MustBeDefined(dapperSettings.Database, nameof(dapperSettings.Database));
            Condition.MustBeDefined(dapperSettings.UserId, nameof(dapperSettings.UserId));
            Condition.MustBeDefined(dapperSettings.Password, nameof(dapperSettings.Password));

            var connectionStringBuilder = new MySqlConnectionStringBuilder
            {
                Server = dapperSettings.Host,
                Port = dapperSettings.Port,
                Database = dapperSettings.Database,
                UserID = dapperSettings.UserId,
                Password = dapperSettings.Password
            };
            var dbConnection = new MySqlConnection(connectionStringBuilder.ConnectionString);

            await dbConnection.OpenAsync();

            return new DbConnectionWrapper(dbConnection);
        }
    }
}
