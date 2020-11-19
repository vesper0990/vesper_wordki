using System;
using System.Threading.Tasks;
using Wordki.Api.Domain;
using Wordki.Api.Services;
using Wordki.Utils.TimeProvider;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Wordki.Api.Framework.Options;

namespace Wordki.Api.Repositories.EntityFrameworkRepositories
{

    public interface IDatabaseInitializer
    {
        Task Init();
    }

    public class DatabaseInitializer : IDatabaseInitializer
    {
        private readonly WordkiDbContext dbContext;
        private readonly ITimeProvider timeProvider;
        private readonly IEncrypter encrypter;
        private readonly General options;


        public DatabaseInitializer(WordkiDbContext dbContext,
         ITimeProvider timeProvider,
          IEncrypter encrypter,
          IOptions<General> options)
        {
            this.dbContext = dbContext;
            this.timeProvider = timeProvider;
            this.encrypter = encrypter;
            this.options = options.Value;
        }

        public async Task Init()
        {
            await dbContext.Database.EnsureCreatedAsync();

            if (!options.Mocks)
            {
                return;
            }

            if (await dbContext.Users.AnyAsync(u => u.Name.Equals("testUser")))
            {
                return;
            }

            var random = new Random();

            var beginningDate = timeProvider.GetTime().AddDays(-7);
            Domain.User user = new Domain.User
            {
                Name = "testUser",
                CreationDate = timeProvider.GetTime().AddDays(-7),
                LastLoginDate = timeProvider.GetTime().AddDays(-1),
                Password = encrypter.Md5Hash("testPassword"),
            };

            for (var i = 0; i < 6; i++)
            {
                var newLesson = new Lesson
                {
                    StartDate = timeProvider.GetTime().AddDays(-i),
                    FinishDate = timeProvider.GetTime().AddDays(-i).AddMinutes(random.Next(20, 30)),
                    User = user
                };
                user.Lessons.Add(newLesson);
            }

            for (var i = 0; i < 7; i++)
            {
                var newGroup = new Domain.Group
                {
                    GroupCreationDate = timeProvider.GetTime().AddDays(-i - 1),
                    GroupLanguage1 = 1,
                    GroupLanguage2 = 2,
                    Name = $"Test group {i + 1}",
                    User = user
                };
                user.Groups.Add(newGroup);

                for (var j = 0; j < random.Next(15, 20); j++)
                {
                    var newCard = new Domain.Card
                    {
                        WordCreationDate = timeProvider.GetTime().AddDays(-i - 1),
                        Comment = "Test comment to word",
                        Group = newGroup,
                        IsVisible = true,
                        Heads = new Side
                        {
                            Value = $"Word {j + 1}",
                            Example = $"Simple sentance where Word {j + 1} is used.",
                            State = new State
                            {
                                Drawer = Drawer.Create(random.Next(0, 4)),
                                NextRepeat = timeProvider.GetTime().AddDays(random.Next(-4, 4))
                            }
                        },
                        Tails = new Side
                        {
                            Value = $"Słowo {j + 1}",
                            Example = $"Proste zdanie gdzie słowo {j + 1} jest użyte.",
                            State = new State
                            {
                                Drawer = Drawer.Create(random.Next(0, 4)),
                                NextRepeat = timeProvider.GetTime().AddDays(random.Next(-4, 4))
                            }
                        },
                    };

                    newGroup.Words.Add(newCard);

                    for (var k = 0; k < random.Next(1, 7); k++)
                    {
                        var lesson = user.Lessons[random.Next(user.Lessons.Count - 1)];
                        var newRepeat = new Repeat
                        {
                            Lesson = lesson,
                            DateTime = newCard.WordCreationDate.AddDays(random.Next(-7, 0)),
                            Result = random.Next(-1, 1),
                            QuestionSide = random.Next(0, 1) > 0 ? QuestionSideEnum.Heads : QuestionSideEnum.Tails,
                            Word = newCard
                        };
                        lesson.Repeats.Add(newRepeat);
                        newCard.Repeats.Add(newRepeat);
                    }
                }
            }

            dbContext.Users.Add(user);
            await dbContext.SaveChangesAsync();
        }
    }
}
