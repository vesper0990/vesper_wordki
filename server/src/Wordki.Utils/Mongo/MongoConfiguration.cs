using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Wordki.Utils.Mongo
{
    public interface IMongoConfiguration
    {
        Task Test();
    }

    public class MongoConfiguration : IMongoConfiguration
    {

        public IMongoDatabase Database { get; set; }

        public async Task Test()
        {
            var client = new MongoClient("mongodb://root:example@192.168.99.100:27017");
            Database = client.GetDatabase("TestXXX");
        }
    }
}
