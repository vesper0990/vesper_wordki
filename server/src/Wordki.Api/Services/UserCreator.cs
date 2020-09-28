using Wordki.Api.Domain;

namespace Wordki.Api.Services
{
    public interface IUserCreator
    {
        User Create(string userName, string hashedPassword);
    }
    public class UserCreator : IUserCreator
    {
        private readonly IDateTimeProvider dateTimeProvider;

        public UserCreator(IDateTimeProvider dateTimeProvider)
        {
            this.dateTimeProvider = dateTimeProvider;
        }

        public User Create(string userName, string hashedPassword)
        {
            var newUser = new User()
            {
                Name = userName,
                Password = hashedPassword,
                CreationDate = dateTimeProvider.Now(),
            };
            return newUser;
        }
    }
}
