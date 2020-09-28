using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Wordki.Api.Domain;

namespace Wordki.Api.Repositories.EntityFrameworkRepositories
{
    public class WordkiDbContext : DbContext
    {
        private readonly DatabaseConfig databaseConfig;

        public DbSet<User> Users { get; set; }
        public DbSet<Group> Groups { get; set; }
        public DbSet<Card> Words { get; set; }
        public DbSet<Repeat> Repeats { get; set; }

        public WordkiDbContext(IOptions<DatabaseConfig> databaseConfig)
        {
            this.databaseConfig = databaseConfig.Value;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var connectionString = $"Server={databaseConfig.Server};Port={databaseConfig.Port};Database={databaseConfig.Database};Uid={databaseConfig.User};Pwd={databaseConfig.Password}";
            optionsBuilder.UseMySql(connectionString);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>(user =>
            {
                user.HasKey(u => u.Id);
                user.HasMany(u => u.Groups).WithOne(g => g.User);
            });

            modelBuilder.Entity<Group>(group =>
            {
                group.HasKey(g => g.Id);
                group.HasMany(g => g.Words).WithOne(w => w.Group);
            });

            modelBuilder.Entity<Card>(card =>
            {
                card.HasKey(w => w.Id);
                card.HasMany(w => w.Repeats).WithOne(r => r.Word);

                card
                .Property(w => w.Drawer)
                .HasConversion(
                    v => v.Value,
                    v => Drawer.Create(v));

                card.OwnsOne(c => c.CardSide1);
                card.OwnsOne(c => c.CardSide2);
            });

            modelBuilder.Entity<Repeat>(repeat =>
            {
                repeat
                .Property(x => x.Result)
                .HasConversion(
                    v => v.Value,
                    v => RepeatResult.Create(v));
            });
        }
    }
}
