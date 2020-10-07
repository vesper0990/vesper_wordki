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
            return new Api.Domain.Card
            {
                Id = 1,
                CardSide1 = new Api.Domain.Word { Value = "cardSide1", Example = "cardSideExample1" },
                CardSide2 = new Api.Domain.Word { Value = "cardSide2", Example = "cardSideExample2" },
                Comment = "comment",
                Drawer = Api.Domain.Drawer.Create(2),
                IsVisible = true,
                WordCreationDate = new DateTime(1990, 9, 24),
                NextRepeat = new DateTime(1990, 9, 25)
            };
        }
    }
}
