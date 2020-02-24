using Microsoft.AspNetCore.TestHost;
using Moq;
using System;
using System.Collections.Generic;
using System.Text;
using Wordki.Core;
using Wordki.Core.Data;
using Wordki.Infrastructure.Services;
using Wordki.Utils.HttpContext;
using Wordki.Utils.TimeProvider;

namespace Wordki.Tests.EndToEnd
{
    public class Utils
    {
        public static string UserName { get; } = "UserName";
        public static string Password { get; } = "Password";
        public static string PasswordHash { get; } = "PasswordHash";
        public static DateTime CreationDate { get; } = new DateTime(1990, 1, 1);
        public static DateTime LastLoginDate { get; } = new DateTime(1990, 9, 24);

        public static Mock<IUserRepository> UserRepository
        {
            get
            {
                return new Mock<IUserRepository>();
            }
        }

        public static Mock<ITimeProvider> TimeProvider
        {
            get
            {
                var timeProviderMock = new Mock<ITimeProvider>();
                timeProviderMock.Setup(x => x.GetTime()).Returns(new DateTime(1990, 9, 24));
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
                var httpContextProviderMock = new Mock<IHttpContextProvider>();
                httpContextProviderMock.Setup(x => x.GetUserId()).Returns(1);
                return httpContextProviderMock;
            }
        }

        //public User CreateUser(TestServer testServer)
        //{

        //}
    }
}
