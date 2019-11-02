using MySql.Data.MySqlClient;
using Dapper;
using System.Threading.Tasks;
using System.Collections.Generic;
using System;

namespace Wordki.Utils.Dapper
{
    public interface IDbConnectionWrapper : IDisposable
    {
        Task Execute(string sql, object param = null);
        Task<IEnumerable<T>> GetAsync<T>(string sql, object param = null);
        Task<T> GetSingleAsync<T>(string sql, object param = null);
    }

    public class DbConnectionWrapper : IDbConnectionWrapper
    {
        private readonly MySqlConnection dbConnection;

        public DbConnectionWrapper(MySqlConnection dbConnection)
        {
            this.dbConnection = dbConnection;
        }

        public void Dispose()
        {
            dbConnection.Close();
            dbConnection.Dispose();
        }

        public async Task Execute(string sql, object param = null)
        {
            await dbConnection.ExecuteAsync(sql, param);
        }

        public async Task<IEnumerable<T>> GetAsync<T>(string sql, object param = null)
        {
            return await dbConnection.QueryAsync<T>(sql, param);
        }

        public async Task<T> GetSingleAsync<T>(string sql, object param = null)
        {
            return await dbConnection.QueryFirstOrDefaultAsync<T>(sql, param);
        }
    }
}
