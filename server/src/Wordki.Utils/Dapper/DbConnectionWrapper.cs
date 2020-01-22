using MySql.Data.MySqlClient;
using Dapper;
using System.Threading.Tasks;
using System.Collections.Generic;
using System;

namespace Wordki.Utils.Dapper
{
    public interface IDbConnectionWrapper : IDisposable
    {
        MySqlConnection Get { get; }
        Task Execute(string sql, object param = null);
        Task<long> ExecuteScalar(string sql, object param = null);
        Task<IEnumerable<T>> GetAsync<T>(string sql, object param = null);
        Task<IEnumerable<TReturn>> GetAsync<TFirst, TSecond, TReturn>(string sql, object param = null, Func<TFirst, TSecond, TReturn> map = null, string splitOn = "");
        Task<T> GetSingleAsync<T>(string sql, object param = null);
    }

    public class DbConnectionWrapper : IDbConnectionWrapper
    {
        private readonly MySqlConnection dbConnection;

        public MySqlConnection Get => dbConnection;

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

        public async Task<IEnumerable<TReturn>> GetAsync<TFirst, TSecond, TReturn>(string sql, object param = null, Func<TFirst, TSecond, TReturn> map = null, string splitOn = "")
        {
            return await dbConnection.QueryAsync<TFirst, TSecond, TReturn>(sql, map, param, splitOn: splitOn);
        }

        public async Task<long> ExecuteScalar(string sql, object param = null)
        {
            return await dbConnection.ExecuteScalarAsync<long>(sql, param);
        }
    }
}
