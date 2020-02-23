using Microsoft.EntityFrameworkCore;
using Wordki.Core.Dtos;

namespace Wordki.Tests.EndToEnd.Configuration
{
    public class EntityFramework : DbContext
    {

        public DbSet<UserDto> Users { get; set; }
        //public DbSet<GroupDto> Groups { get; set; }
        //public DbSet<WordDto> Words { get; set; }

        public EntityFramework()
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseMySql("Server=localhost;Port=3306;Database=Wordki_Test;Uid=root;Pwd=pass1;");
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
        }



    }
}
