using Microsoft.EntityFrameworkCore;
using MySql.Data.EntityFrameworkCore.Extensions;
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

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<User>()
                .Property(g => g.Id)
                .ValueGeneratedOnAdd();
            builder.Entity<User>()
                .HasKey(x => x.Id);

            builder.Entity<Group>()
                .Property(g => g.Id)
                .ValueGeneratedOnAdd();
            builder.Entity<Group>()
                .HasOne(x => x.User)
                .WithMany(x => x.Groups)
                .HasForeignKey(x => x.UserId);
            builder.Entity<Group>().ForMySQLHasCharset("utf8");
            builder.Entity<Group>().Property(x => x.Name).ForMySQLHasCharset("utf8");
            builder.Entity<Group>()
                .HasKey(g => new { g.Id });


            builder.Entity<Result>()
                .HasKey(r => new { r.Id });
            builder.Entity<Result>()
                .Property(g => g.Id)
                .ValueGeneratedOnAdd();
            builder.Entity<Result>()
                .HasOne(x => x.Group)
                .WithMany(x => x.Results)
                .HasForeignKey(x => x.GroupId);

            builder.Entity<Word>()
                .HasKey(r => new { r.Id });
            builder.Entity<Word>()
                .Property(g => g.Id)
                .ValueGeneratedOnAdd();
            builder.Entity<Word>()
                .HasOne(x => x.Group)
                .WithMany(x => x.Words)
                .HasForeignKey(x => x.GroupId);
            builder.Entity<Word>().ForMySQLHasCharset("utf8");
            builder.Entity<Word>().Property(x => x.Language1).ForMySQLHasCharset("utf8");
            builder.Entity<Word>().Property(x => x.Language2).ForMySQLHasCharset("utf8");
            builder.Entity<Word>().Property(x => x.Language1Example).ForMySQLHasCharset("utf8");
            builder.Entity<Word>().Property(x => x.Language2Example).ForMySQLHasCharset("utf8");
            builder.Entity<Word>().Property(x => x.Comment).ForMySQLHasCharset("utf8");
        }


    }
}
