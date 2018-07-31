namespace Wordki.Infrastructure.Settings
{
    public class GeneralSettings
    {
        public DatabaseType Database { get; set; }
        public string ConnectionString { get; set; }
        public bool SeedData { get; set; }

    }

    public enum DatabaseType
    {
        InMemory,
        MySql
    }
}
