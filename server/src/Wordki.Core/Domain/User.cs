﻿using System;
using Wordki.Utils.Domain;
using Wordki.Utils.TimeProvider;

namespace Wordki.Core
{
    public class User : IDomainObject
    {
        public Guid? Id { get; }
        public string Name { get; }
        public string Password { get; }
        public DateTime CreationDate { get; }
        public DateTime? LastLoginDate { get; private set; }

        private User(Guid? id, string name, string password, DateTime creationDate, DateTime? lastLoginDate)
        {
            Id = id;
            Name = name;
            Password = password;
            CreationDate = creationDate;
            LastLoginDate = lastLoginDate;
        }

        public class UserLogin : IUserLogin
        {
            private readonly ITimeProvider timeProvider;

            public UserLogin(ITimeProvider timeProvider)
            {
                this.timeProvider = timeProvider;
            }

            public void Login(User user)
            {
                user.LastLoginDate = timeProvider.GetTime();
            }
        }

        public class UserRestoration : IUserRestoration
        {
            public User Restore(Guid id, string name, string password, DateTime creationDate, DateTime? lastLoginDate)
            {
                return new User(id, name, password, creationDate, lastLoginDate);
            }
        }

        public class UserFactory : IUserFactory
        {
            private readonly ITimeProvider timeProvider;

            public UserFactory(ITimeProvider timeProvider)
            {
                this.timeProvider = timeProvider;
            }
            public User Create(string name, string password)
            {
                var creationTime = timeProvider.GetTime();
                return new User(null, name, password, creationTime, null);
            }
        }
    }

    public interface IUserLogin
    {
        void Login(User user);
    }
    public interface IUserRestoration
    {
        User Restore(Guid id, string name, string password, DateTime creationDate, DateTime? lastLoginDate);
    }

    public interface IUserFactory
    {
        User Create(string name, string password);
    }
}