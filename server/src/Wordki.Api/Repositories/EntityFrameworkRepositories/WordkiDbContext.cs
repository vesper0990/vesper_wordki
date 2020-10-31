using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Wordki.Api.Domain;

namespace Wordki.Api.Repositories.EntityFrameworkRepositories
{
    public class WordkiDbContext : DbContext
    {
        private readonly DatabaseConfig databaseConfig;
        private static readonly ILoggerFactory loggerFactory = LoggerFactory.Create(builder =>
        {
            builder
            .AddConsole((options) => { })
            .AddFilter((category, level) => category == DbLoggerCategory.Database.Command.Name && level == LogLevel.Information);
        });

        public DbSet<User> Users { get; set; }
        public DbSet<Group> Groups { get; set; }
        public DbSet<Card> Words { get; set; }
        public DbSet<Repeat> Repeats { get; set; }
        public DbSet<Lesson> Lessons { get; set; }

        public WordkiDbContext(IOptions<DatabaseConfig> databaseConfig)
        {
            this.databaseConfig = databaseConfig.Value;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //var connectionString = $"Host=ec2-46-137-156-205.eu-west-1.compute.amazonaws.com;Port=5432;Database=d3eoufsd95lnc0;User Id=bqobwxfagmhqby;Password=6b444f3e788275e0c8ac2809756616f7597c70abc06c1e5d57d9870f1cf84723";
            var connectionString = $"Host={databaseConfig.Server};Port={databaseConfig.Port};Database={databaseConfig.Database};User Id={databaseConfig.User};Password={databaseConfig.Password}";
            optionsBuilder
                .UseLoggerFactory(loggerFactory)
                .EnableSensitiveDataLogging()
                .UseNpgsql(connectionString);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>(user =>
            {
                user.HasKey(u => u.Id);
                user.HasMany(u => u.Groups).WithOne(g => g.User);
                user.HasMany(u => u.Lessons).WithOne(l => l.User);
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
                card.OwnsOne(c => c.Tails, tails =>
                {
                    tails.OwnsOne(t => t.State, state =>
                    {
                        state.Property(s => s.Drawer)
                        .HasColumnName("Tails_Drawer")
                        .HasConversion(
                        v => v.Value,
                        v => Drawer.Create(v));

                        state.Property(s => s.NextRepeat)
                        .HasColumnName("Tails_NextRepeat");
                    });
                });
                card.OwnsOne(c => c.Heads, tails =>
                {
                    tails.OwnsOne(t => t.State, state =>
                    {
                        state.Property(s => s.Drawer)
                        .HasColumnName("Heads_Drawer")
                        .HasConversion(
                        v => v.Value,
                        v => Drawer.Create(v));

                        state.Property(s => s.NextRepeat)
                        .HasColumnName("Heads_NextRepeat");
                    });
                });
            });

            modelBuilder.Entity<Lesson>(lesson =>
            {
                lesson.HasKey(l => l.Id);
                lesson.HasMany(l => l.Repeats).WithOne(r => r.Lesson);
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
