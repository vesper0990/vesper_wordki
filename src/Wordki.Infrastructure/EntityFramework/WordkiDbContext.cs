using Microsoft.EntityFrameworkCore;
using Wordki.Core;

namespace Wordki.Infrastructure.EntityFramework
{
    public class WordkiDbContext : DbContext
    {

        public DbSet<User> Users { get; set; }
        public DbSet<Group> Groups { get; set; }
        public DbSet<Word> Words { get; set; }
        public DbSet<Result> Results { get; set; }

        public WordkiDbContext(DbContextOptions<WordkiDbContext> options) : base(options)
        {

        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseMySql(@"Server=localhost;database=test;uid=root;pwd=Akuku123;");
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<User>()
                .Property(g => g.Id)
                .ValueGeneratedOnAdd();

            builder.Entity<Group>()
                .Property(g => g.Id)
                .ValueGeneratedOnAdd();

            builder.Entity<Group>()
                .HasKey(g => new { g.Id, g.UserId });

            builder.Entity<Result>()
                .HasKey(r => new { r.Id, r.UserId });
            builder.Entity<Result>()
                .Property(g => g.Id)
                .ValueGeneratedOnAdd();
            builder.Entity<Result>()
                .HasOne(x => x.Group)
                .WithMany(x => x.Results)
                .HasForeignKey(x => new { x.GroupId, x.UserId });

            builder.Entity<Word>()
                .HasKey(r => new { r.Id, r.UserId });
            builder.Entity<Word>()
                .Property(g => g.Id)
                .ValueGeneratedOnAdd();
            builder.Entity<Word>()
                .HasOne(x => x.Group)
                .WithMany(x => x.Words)
                .HasForeignKey(x => new { x.GroupId, x.UserId });
        }


    }
}
