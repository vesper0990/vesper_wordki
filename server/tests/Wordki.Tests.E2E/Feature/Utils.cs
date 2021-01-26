using FizzWare.NBuilder;
using Moq;
using System;
using Wordki.Api.Services;
using Wordki.Utils.HttpContext;

namespace Wordki.Tests.E2E.Feature
{
    public class Utils
    {
        public static string UserName { get; } = "UserName";
        public static string Password { get; } = "Password";
        public static string PasswordHash { get; } = "PasswordHash";
        public static DateTime CreationDate { get; } = new DateTime(1990, 1, 1);
        public static DateTime LastLoginDate { get; } = new DateTime(1990, 9, 24);

        public static DateTime Now = new DateTime(2020, 1, 1);
        public static DateTime Time = new DateTime(2020, 1, 1, 1, 1, 1);
        public static DateTime Yesterday = new DateTime(2019, 12, 31);
        public static DateTime Tommorow = new DateTime(2020, 1, 2);

        public static Mock<Wordki.Utils.TimeProvider.ITimeProvider> TimeProvider
        {
            get
            {
                var timeProviderMock = new Mock<Wordki.Utils.TimeProvider.ITimeProvider>();
                timeProviderMock.Setup(x => x.GetDate()).Returns(Now);
                timeProviderMock.Setup(x => x.GetTime()).Returns(Time);
                return timeProviderMock;
            }
        }

        public static Mock<IEncrypter> Encrypter
        {
            get
            {
                var encrypterMock = new Mock<IEncrypter>();
                encrypterMock.Setup(x => x.Md5Hash(It.IsAny<string>())).Returns("aaaa");
                return encrypterMock;
            }
        }

        public static Mock<IHttpContextProvider> HttpContextProvider
        {
            get
            {
                var httpContextMock = new Mock<IHttpContextProvider>();
                httpContextMock.Setup(x => x.GetUserId()).Returns(1);
                return httpContextMock;
            }
        }

        public static Api.Domain.User GetUser()
        {
            return new Api.Domain.User
            {
                Id = 1,
                Name = "UserName",
                Password = "aaaa",
                CreationDate = Yesterday,
                LastLoginDate = Yesterday
            };
        }

        public static Api.Domain.Group GetGroup()
        {
            return new Api.Domain.Group
            {
                Id = 1,
                FrontLanguage = 1,
                BackLanguage = 2,
                Name = "GroupName",
                GroupCreationDate = Yesterday
            };
        }

        public static Api.Domain.Card GetCard()
        {
            SequentialGenerator<long> generator = new SequentialGenerator<long>()
            {
                Increment = 1,
                Direction = GeneratorDirection.Ascending,
            };

            generator.StartingWith(1);

            var builder = Builder<Api.Domain.Card>.CreateNew()
                .With(x => x.Id = generator.Generate())
                .With(x => x.Front = GetSide())
                .With(x => x.Back = GetSide())
                .With(x => x.CreationDate = Yesterday);
            return builder.Build();
        }

        public static Api.Domain.State GetState()
            => Builder<Api.Domain.State>.CreateNew()
            .With(s => s.Drawer = Api.Domain.Drawer.Create(2))
            .With(s => s.NextRepeat = Tommorow)
            .Build();

        public static Api.Domain.Side GetSide()
         => Builder<Api.Domain.Side>.CreateNew()
         .With(s => s.State = GetState())
         .Build();

        public static Api.Domain.Repeat GetRepeat()
        {
            return new Api.Domain.Repeat
            {
                DateTime = Yesterday,
                QuestionSide = Api.Domain.QuestionSideEnum.Heads,
                Result = -1
            };
        }

        public static Api.Domain.Lesson GetLesson()
        => Builder<Api.Domain.Lesson>.CreateNew().Build();
    }
}
