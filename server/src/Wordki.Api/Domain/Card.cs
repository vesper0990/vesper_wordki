using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Wordki.Api.Domain;
using Wordki.Api.Repositories.EntityFrameworkRepositories;
using Wordki.Utils.TimeProvider;

namespace Wordki.Api.Domain
{
    public class Card
    {
        public long Id { get; set; }
        public Side Front { get; set; }
        public Side Back { get; set; }
        public DateTime CreationDate { get; set; }
        public Group Group { get; set; }
        public IList<Repeat> Repeats { get; }

        public Card()
        {
            Repeats = new List<Repeat>();
        }
    }
}

namespace Wordki.Api.Domain2
{
    public class User
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }
        public DateTime CreationDate { get; set; }
        public DateTime LastLoginDate { get; set; }

        public IList<CardDetails> Details { get; set; }
        public IList<Group> Groups { get; set; }
        public IList<Card> Cards { get; set; }
        public IList<Lesson> Lessons { get; set; }

        public User()
        {
            Details = new List<CardDetails>();
            Groups = new List<Group>();
            Lessons = new List<Lesson>();
        }

        public void AddGroup(Group group)
        {
            group.Owner = this;
            foreach (var details in group.Cards.SelectMany(c => c.CardDetails))
            {
                details.Owner = this;
            }
            Groups.Add(group);
        }

        public void AddDetails(CardDetails details)
        {
            details.Owner = this;
            Details.Add(details);
        }

        public void AddLesson(Lesson lesson)
        {
            lesson.Owner = this;
            Lessons.Add(lesson);
        }
    }

    public class Group
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public int FrontLanguage { get; set; }
        public int BackLanguage { get; set; }
        public DateTime CreationDate { get; set; }

        public IList<Card> Cards { get; set; }
        public User Owner { get; set; }

        public int CardsCount => Cards.Count();
        [NotMapped]
        public int RepeatsCount => Cards.SelectMany(c => c.CardDetails).SelectMany(d => d.Repeats).Count();

        public Group()
        {
            Cards = new List<Card>();
        }

        public void AddCard(Card card)
        {
            Cards.Add(card);
            card.Group = this;
        }

        public Card RemoveCard(long cardId)
        {
            var card = Cards.SingleOrDefault(c => c.Id == cardId);

            Cards.Remove(card);
            return card;
        }
    }

    public class Card
    {
        public long Id { get; set; }
        public string FrontValue { get; set; }
        public string BackValue { get; set; }
        public string FrontExample { get; set; }
        public string BackExample { get; set; }

        public Group Group { get; set; }
        public IList<CardDetails> CardDetails { get; set; }

        [NotMapped]
        public CardDetails FrontDetails => CardDetails.SingleOrDefault(d => d.Direction == QuestionSideEnum.Front);
        [NotMapped]
        public CardDetails BackDetails => CardDetails.SingleOrDefault(d => d.Direction == QuestionSideEnum.Back);

        public Card()
        {
            CardDetails = new List<CardDetails>();
        }

        public void AddDetails(CardDetails details)
        {
            details.Card = this;
            CardDetails.Add(details);
        }
    }

    public class CardDetails
    {
        public long Id { get; set; }
        public QuestionSideEnum Direction { get; set; }
        public int Drawer { get; set; }
        public DateTime? NextRepeatDate { get; set; }

        public User Owner { get; set; }
        public Card Card { get; set; }
        public IList<Repeat> Repeats { get; set; }

        [NotMapped]
        public int Question => Direction == QuestionSideEnum.Front ? Card.Group.FrontLanguage : Card.Group.BackLanguage;

        [NotMapped]
        public int Answer => Direction == QuestionSideEnum.Front ? Card.Group.BackLanguage : Card.Group.FrontLanguage;

        public CardDetails()
        {
            Repeats = new List<Repeat>();
        }
    }

    public class Repeat
    {
        public long Id { get; set; }
        public DateTime Time { get; set; }
        public int Result { get; set; }

        public CardDetails Details { get; set; }
        public Lesson Lesson { get; set; }
    }

    public class Lesson
    {
        public long Id { get; set; }
        public DateTime Date { get; set; }

        public User Owner { get; set; }
        public IList<Repeat> Repeats { get; set; }
    }

    public class WordkiDbContext2 : DbContext
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
        public DbSet<CardDetails> Details { get; set; }
        public DbSet<Repeat> Repeats { get; set; }
        public DbSet<Lesson> Lessons { get; set; }

        public WordkiDbContext2(IConnectionStringProvider provider)
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
            modelBuilder.HasDefaultSchema("wrd2");

            modelBuilder.Entity<User>(user =>
            {
                user.HasKey(u => u.Id);
                user.Property(u => u.Id).ValueGeneratedOnAdd();
                user.HasMany(u => u.Groups).WithOne(g => g.Owner).OnDelete(DeleteBehavior.Cascade);
                user.HasMany(u => u.Lessons).WithOne(l => l.Owner).OnDelete(DeleteBehavior.Cascade);
                user.HasMany(u => u.Details).WithOne(l => l.Owner).OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<Group>(group =>
            {
                group.HasKey(g => g.Id);
                group.Property(g => g.Id).ValueGeneratedOnAdd();
                group.HasMany(g => g.Cards).WithOne(c => c.Group).OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<Card>(card =>
            {
                card.HasKey(w => w.Id);
                card.HasMany(c => c.CardDetails).WithOne(d => d.Card);
                card.HasOne(c => c.Group).WithMany(g => g.Cards).OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<CardDetails>(details =>
            {
                details.HasKey(d => d.Id);
                details.HasOne(d => d.Card).WithMany(c => c.CardDetails).OnDelete(DeleteBehavior.Cascade);
                details.HasMany(d => d.Repeats).WithOne(r => r.Details).OnDelete(DeleteBehavior.Cascade);
                details.HasOne(d => d.Owner).WithMany(u => u.Details).OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<Lesson>(lesson =>
            {
                lesson.HasKey(l => l.Id);
                lesson.HasMany(l => l.Repeats).WithOne(r => r.Lesson).OnDelete(DeleteBehavior.Cascade);
                lesson.HasOne(l => l.Owner).WithMany(u => u.Lessons).OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<Repeat>(repeat =>
            {
                repeat.HasKey(r => r.Id);
                repeat.HasOne(r => r.Details).WithMany(d => d.Repeats).OnDelete(DeleteBehavior.Cascade);
                repeat.HasOne(r => r.Lesson).WithMany(d => d.Repeats).OnDelete(DeleteBehavior.Cascade);
            });
        }
    }

    public class CardFactory : ICardFactory
    {
        public Card Clone(Card card)
        {
            return Create(card.FrontValue, card.BackValue, card.FrontExample, card.BackExample);
        }

        public Card Create(string frontValue, string backValue, string frontExample, string backExample)
        {
            var newCard = new Card()
            {
                FrontValue = frontValue,
                FrontExample = frontExample,
                BackValue = backValue,
                BackExample = backExample
            };
            newCard.AddDetails(new CardDetails
            {
                Direction = QuestionSideEnum.Front,
                Drawer = 0,
                NextRepeatDate = null
            });
            newCard.AddDetails(new CardDetails
            {
                Direction = QuestionSideEnum.Back,
                Drawer = 0,
                NextRepeatDate = null
            });

            return newCard;
        }
    }

    public interface ICardFactory
    {
        Card Create(string frontValue, string backValue, string frontExample, string backExample);
        Card Clone(Card card);
    }

    public interface IGroupFactory
    {
        Group Create(string name, int frontLanguage, int backLanguage);
        Group Clone(Group group);
    }

    public class GroupFactory : IGroupFactory
    {
        private readonly ITimeProvider timeProvider;
        private readonly ICardFactory cardFactory;

        public GroupFactory(ITimeProvider timeProvider, ICardFactory cardFactory)
        {
            this.timeProvider = timeProvider;
            this.cardFactory = cardFactory;
        }

        public Group Create(string name, int frontLanguage, int backLanguage)
        => new Group
        {
            Name = name,
            FrontLanguage = frontLanguage,
            BackLanguage = backLanguage,
            CreationDate = timeProvider.GetDate()
        };

        public Group Clone(Group group)
        {
            var clone = Create(group.Name, group.FrontLanguage, group.BackLanguage);
            foreach (var card in group.Cards)
            {
                clone.AddCard(cardFactory.Clone(card));
            }
            return clone;
        }

    }


}