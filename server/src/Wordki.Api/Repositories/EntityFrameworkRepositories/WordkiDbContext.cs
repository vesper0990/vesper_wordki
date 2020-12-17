using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Wordki.Api.Domain;

namespace Wordki.Api.Repositories.EntityFrameworkRepositories
{
    public class WordkiDbContext : DbContext
    {
        private static readonly ILoggerFactory loggerFactory = LoggerFactory.Create(builder =>
        {
            builder
            .AddConsole((options) => { })
            .AddFilter((category, level) => category == DbLoggerCategory.Database.Command.Name && level == LogLevel.Information);
        });
        private readonly IConnectionStringProvider provider;

        public DbSet<User> Users { get; set; }
        public DbSet<Group> Groups { get; set; }
        public DbSet<Card> Words { get; set; }
        public DbSet<Repeat> Repeats { get; set; }
        public DbSet<Lesson> Lessons { get; set; }

        public WordkiDbContext(IConnectionStringProvider provider)
        {
            this.provider = provider;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder
                .UseLoggerFactory(loggerFactory)
                .EnableSensitiveDataLogging()
                .UseNpgsql(provider.ConnectionString);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.HasDefaultSchema("wrd");

            modelBuilder.Entity<User>(user =>
            {
                user.HasKey(u => u.Id);
                user.HasMany(u => u.Groups).WithOne(g => g.User);
                user.HasMany(u => u.Lessons).WithOne(l => l.User);
            });

            modelBuilder.Entity<Group>(group =>
            {
                group.HasKey(g => g.Id);
                group.HasMany(g => g.Words).WithOne(w => w.Group).OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<Card>(card =>
            {
                card.HasKey(w => w.Id);
                card.HasMany(w => w.Repeats).WithOne(r => r.Word).OnDelete(DeleteBehavior.Cascade);
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
                repeat.HasKey(r => r.Id);
            });
        }
    }
}
