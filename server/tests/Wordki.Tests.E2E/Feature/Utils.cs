using Moq;
using System;
using Wordki.Api.Services;

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
    }
}
