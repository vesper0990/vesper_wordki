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

        public static Mock<IDateTimeProvider> DateTimeProvider
        {
            get
            {
                var timeProviderMock = new Mock<IDateTimeProvider>();
                timeProviderMock.Setup(x => x.Now()).Returns(new DateTime(1990, 9, 24));
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
                CreationDate = new DateTime(1990, 9, 24),
                LastLoginDate = new DateTime(1990, 9, 25)
            };
        }

        public static Api.Domain.Group GetGroup()
        {
            return new Api.Domain.Group
            {
                Id = 1,
                GroupLanguage1 = 1,
                GroupLanguage2 = 2,
                Name = "GroupName",
                GroupCreationDate = new DateTime(1990, 9, 24)
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
                .With(x => x.Heads = Builder<Api.Domain.Side>.CreateNew().Build())
                .With(x => x.Tails = Builder<Api.Domain.Side>.CreateNew().Build());

            var card = builder.Build();
            var card2 = builder.Build();

            return new Api.Domain.Card
            {
                Id = 1,
                Heads = new Api.Domain.Side { Value = "cardSide1", Example = "cardSideExample1" },
                Tails = new Api.Domain.Side { Value = "cardSide2", Example = "cardSideExample2" },
                Comment = "comment",
                IsVisible = true,
                WordCreationDate = new DateTime(1990, 9, 24),
            };
        }
    }
}
