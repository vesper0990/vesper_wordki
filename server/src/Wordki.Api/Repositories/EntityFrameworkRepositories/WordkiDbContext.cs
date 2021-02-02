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
        public DbSet<Card> Cards { get; set; }
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
                user.HasMany(u => u.Groups).WithOne(g => g.Owner);
                user.HasMany(u => u.Lessons).WithOne(l => l.User);
            });

            modelBuilder.Entity<Group>(group =>
            {
                group.HasKey(g => g.Id);
                group.HasMany(g => g.Cards).WithOne(w => w.Group).OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<Card>(card =>
            {
                card.HasKey(w => w.Id);
                card.HasMany(w => w.Repeats).WithOne(r => r.Word).OnDelete(DeleteBehavior.Cascade);
                card.OwnsOne(c => c.Back, tails =>
                {
                    tails.OwnsOne(t => t.State, state =>
                    {
                        state.Property(s => s.Drawer)
                        .HasColumnName("Tails_Drawer")
                        .HasConversion(
                        v => v.Value,
                        v => Domain.Drawer.Create(v));

                        state.Property(s => s.NextRepeat)
                        .HasColumnName("Tails_NextRepeat");
                    });
                });
                card.OwnsOne(c => c.Front, tails =>
                {
                    tails.OwnsOne(t => t.State, state =>
                    {
                        state.Property(s => s.Drawer)
                        .HasColumnName("Heads_Drawer")
                        .HasConversion(
                        v => v.Value,
                        v => Domain.Drawer.Create(v));

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

    // public class WordkiDbContext2 : DbContext
    // {
    //     private static readonly ILoggerFactory loggerFactory = LoggerFactory.Create(builder =>
    //     {
    //         builder
    //         .AddConsole((options) => { })
    //         .AddFilter((category, level) => category == DbLoggerCategory.Database.Command.Name && level == LogLevel.Information);
    //     });
    //     private readonly IConnectionStringProvider provider;

    //     public DbSet<User2> Users { get; set; }
    //     public DbSet<Group2> Groups { get; set; }
    //     public DbSet<Card2> Cards { get; set; }
    //     public DbSet<Repeat2> Repeats { get; set; }
    //     public DbSet<Lesson2> Lessons { get; set; }

    //     public WordkiDbContext2(IConnectionStringProvider provider)
    //     {
    //         this.provider = provider;
    //     }

    //     protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    //     {
    //         optionsBuilder
    //             .UseLoggerFactory(loggerFactory)
    //             .EnableSensitiveDataLogging()
    //             .UseNpgsql(provider.ConnectionString);
    //     }

    //     protected override void OnModelCreating(ModelBuilder modelBuilder)
    //     {
    //         base.OnModelCreating(modelBuilder);

    //         modelBuilder.HasDefaultSchema("wrd2");

    //         modelBuilder.Entity<User2>(user =>
    //         {
    //             user.HasKey(u => u.Id);
    //             user.HasMany(u => u.Groups).WithOne(g => g.Owner);
    //             user.HasMany(u => u.Lessons).WithOne(l => l.User);
    //         });

    //         modelBuilder.Entity<Group2>(group =>
    //         {
    //             group.HasKey(g => g.Id);
    //             group.HasMany(g => g.Cards).WithOne(w => w.Group).OnDelete(DeleteBehavior.Cascade);
    //         });

    //         modelBuilder.Entity<Card2>(card =>
    //         {
    //             card.HasKey(w => w.Id);
    //             card.HasMany(w => w.Repeats).WithOne(r => r.Word).OnDelete(DeleteBehavior.Cascade);
    //             card.HasOne(x => x.Labels);
    //             card.OwnsOne(c => c.Back, back =>
    //             {
    //                 back.Property(s => s.Drawer2)
    //                 .HasColumnName("Back_Drawer")
    //                 .HasConversion(
    //                 v => v.Value,
    //                 v => Drawer2.Create(v));

    //                 back.Property(s => s.NextRepeat)
    //                 .HasColumnName("Back_NextRepeat");
    //                 back.Property(s => s.IsVisible)
    //                 .HasColumnName("Back_Isvisible");
    //             });

    //             card.OwnsOne(c => c.Front, back =>
    //             {
    //                 back.Property(s => s.Drawer2)
    //                 .HasColumnName("Front_Drawer")
    //                 .HasConversion(
    //                 v => v.Value,
    //                 v => Drawer2.Create(v));

    //                 back.Property(s => s.NextRepeat)
    //                 .HasColumnName("Front_NextRepeat");
    //                 back.Property(s => s.IsVisible)
    //                 .HasColumnName("Front_Isvisible");
    //             });

    //             modelBuilder.Entity<CardLabels>(labels =>
    //             {
    //                 labels.HasKey(x => x.Id);
    //                 labels.OwnsOne(x => x.Back, back =>
    //                 {
    //                     back.Property(b => b.Value).HasColumnName("Back_Value");
    //                     back.Property(b => b.Example).HasColumnName("Back_Example");
    //                 });
    //                 labels.OwnsOne(x => x.Front, front =>
    //                 {
    //                     front.Property(b => b.Value).HasColumnName("Front_Value");
    //                     front.Property(b => b.Example).HasColumnName("Front_Example");
    //                 });
    //             });

    //             modelBuilder.Entity<Lesson2>(lesson =>
    //             {
    //                 lesson.HasKey(l => l.Id);
    //                 lesson.HasMany(l => l.Repeats).WithOne(r => r.Lesson);
    //             });

    //             modelBuilder.Entity<Repeat2>(repeat =>
    //             {
    //                 repeat.HasKey(r => r.Id);
    //             });
    //         });
    //     }
    // }

    // public class User2
    // {
    //     public long Id { get; set; }
    //     public string Name { get; set; }
    //     public string Password { get; set; }
    //     public DateTime CreationDate { get; set; }
    //     public DateTime? LastLoginDate { get; set; }
    //     public IList<Group2> Groups { get; }
    //     public IList<Lesson2> Lessons { get; }

    //     public User2()
    //     {
    //         Groups = new List<Group2>();
    //         Lessons = new List<Lesson2>();
    //     }
    // }

    // public class Lesson2
    // {
    //     public long Id { get; set; }
    //     public DateTime StartDate { get; set; }
    //     public DateTime? FinishDate { get; set; }
    //     public User2 User { get; set; }
    //     public IList<Repeat2> Repeats { get; set; }

    //     public Lesson2()
    //     {
    //         Repeats = new List<Repeat2>();
    //     }
    // }

    // public class Repeat2
    // {
    //     public long Id { get; set; }
    //     public DateTime DateTime { get; set; }
    //     public int Result { get; set; }
    //     public QuestionSideEnum QuestionSide { get; set; }
    //     public Card2 Word { get; set; }
    //     public Lesson2 Lesson { get; set; }
    // }

    // public class Card2
    // {
    //     public long Id { get; set; }
    //     public CardLabels Labels { get; set; }
    //     public State2 Front { get; set; }
    //     public State2 Back { get; set; }
    //     public DateTime CreationDate { get; set; }
    //     public Group2 Group { get; set; }
    //     public IList<Repeat2> Repeats { get; }

    //     public Card2()
    //     {
    //         Repeats = new List<Repeat2>();
    //     }
    // }

    // public class Group2
    // {
    //     public long Id { get; set; }
    //     public string Name { get; set; }
    //     public int FrontLanguage { get; set; }
    //     public int BackLanguage { get; set; }
    //     public DateTime GroupCreationDate { get; set; }
    //     public User2 Owner { get; set; }
    //     public IList<Card2> Cards { get; set; }

    //     public Group2()
    //     {
    //         Cards = new List<Card2>();
    //     }
    // }

    // [ComplexType]
    // public class Drawer2
    // {
    //     public int Value { get; set; }

    //     private Drawer2(int value)
    //     {
    //         Value = value;
    //     }

    //     public static Drawer2 Create(int value)
    //     {
    //         if (value < 1 && value > 5)
    //         {
    //             throw new Exception();
    //         }
    //         return new Drawer2(value);
    //     }
    // }

    // [ComplexType]
    // public class State2
    // {
    //     public Drawer2 Drawer2 { get; set; }
    //     public DateTime NextRepeat { get; set; }
    //     public bool IsVisible { get; set; }

    //     public static State2 New() =>
    //         new State2
    //         {
    //             Drawer2 = Drawer2.Create(0),
    //             NextRepeat = new DateTime(0),
    //             IsVisible = true
    //         };
    // }

    // public class CardLabels
    // {
    //     public long Id { get; set; }
    //     public Label Front { get; set; }
    //     public Label Back { get; set; }
    //     public IList<Card> Cards { get; set; }
    // }

    // [ComplexType]
    // public class Label
    // {
    //     public string Value { get; set; }
    //     public string Example { get; set; }
    // }
}
