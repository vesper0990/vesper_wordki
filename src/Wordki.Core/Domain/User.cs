using System;
using Wordki.Utils.Domain;
using Wordki.Utils.TimeProvider;

namespace Wordki.Core
{
    public class User : IDomainObject
    {
        private readonly ITimeProvider timeProvider;

        public Guid? Id { get; }
        public string Name { get; }
        public string Password { get; }
        public DateTime CreationDate { get; }
        public DateTime? LastLoginDate { get; private set; }

        private User(Guid? id, string name, string password, DateTime creationDate, DateTime? lastLoginDate, ITimeProvider timeProvider)
        {
            Id = id;
            Name = name;
            Password = password;
            CreationDate = creationDate;
            LastLoginDate = lastLoginDate;
            this.timeProvider = timeProvider;
        }

        public void Login()
        {
            LastLoginDate = timeProvider.GetTime();
        }

        public class UserFactory : IUserFactory
        {
            private readonly ITimeProvider timeProvider;

            public UserFactory(ITimeProvider timeProvider)
            {
                this.timeProvider = timeProvider;
            }

            public User Restore(Guid id, string name, string password, DateTime creationDate, DateTime? lastLoginDate)
            {
                return new User(id, name, password, creationDate, lastLoginDate, timeProvider);
            }

            public User Create(string name, string password)
            {
                var creationTime = timeProvider.GetTime();
                return new User(null, name, password, creationTime, null, timeProvider);
            }
        }
    }

    public interface IUserFactory
    {
        User Restore(Guid id, string name, string password, DateTime creationDate, DateTime? lastLoginDate);

        User Create(string name, string password);
    }
}
