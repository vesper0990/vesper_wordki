using Microsoft.EntityFrameworkCore;
using Wordki.Core.Dtos;
using Wordki.Utils.Dapper;

namespace Wordki.Tests.EndToEnd.Configuration
{
    public class EntityFramework : DbContext
    {
        private readonly DapperSettings settings;

        public DbSet<UserDto> Users { get; set; }
        public DbSet<GroupDto> Groups { get; set; }
        public DbSet<WordDto> Words { get; set; }
        public DbSet<RepeatDto> Repeats { get; set; }

        public EntityFramework(DapperSettings settings)
        {
            this.settings = settings;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseMySql($"Server={settings.Host};Port={settings.Port};Database={settings.Database};Uid={settings.UserId};Pwd={settings.Password};");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserDto>(entity =>
            {
                entity.ToTable("users");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.Name).HasColumnName("name");
                entity.Property(e => e.Password).HasColumnName("password");
                entity.Property(e => e.CreationDate).HasColumnName("creationDate");
                entity.Property(e => e.LastLoginDate).HasColumnName("lastLoginDate");
            });

            modelBuilder.Entity<GroupDto>(entity =>
            {
                entity.ToTable("groups");
                entity.HasKey(e => e.GroupId);
                entity.Property(e => e.GroupId).HasColumnName("id");
                entity.Property(e => e.UserId).HasColumnName("userId");
                entity.Property(e => e.Name).HasColumnName("name");
                entity.Property(e => e.GroupLanguage1).HasColumnName("language1");
                entity.Property(e => e.GroupLanguage2).HasColumnName("language2");
                entity.Property(e => e.GroupCreationDate).HasColumnName("creationDate");
            });

            modelBuilder.Entity<WordDto>(entity =>
            {
                entity.ToTable("words");
                entity.HasKey(e => e.WordId);
                entity.Property(e => e.WordId).HasColumnName("id");
                entity.Property(e => e.GroupId).HasColumnName("groupId");
                entity.Property(e => e.WordLanguage1).HasColumnName("language1");
                entity.Property(e => e.WordLanguage2).HasColumnName("language2");
                entity.Property(e => e.Example1).HasColumnName("example1");
                entity.Property(e => e.Example2).HasColumnName("example2");
                entity.Property(e => e.Comment).HasColumnName("comment");
                entity.Property(e => e.Drawer).HasColumnName("drawer");
                entity.Property(e => e.IsVisible).HasColumnName("isVisible");
                entity.Property(e => e.WordCreationDate).HasColumnName("creationDate");
                entity.Property(e => e.NextRepeat).HasColumnName("nextRepeat");
            });

            modelBuilder.Entity<RepeatDto>(entity => {
                entity.ToTable("repeats");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.WordId).HasColumnName("WordId");
                entity.Property(e => e.DateTime).HasColumnName("dateTime");
                entity.Property(e => e.Result).HasColumnName("result");
                
            });
        }



    }
}
