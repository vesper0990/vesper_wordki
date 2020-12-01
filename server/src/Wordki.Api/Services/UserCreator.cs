using Wordki.Api.Domain;
using Wordki.Utils.TimeProvider;

namespace Wordki.Api.Services
{
    public interface IUserCreator
    {
        User Create(string userName, string hashedPassword);
    }
    public class UserCreator : IUserCreator
    {
        private readonly ITimeProvider dateTimeProvider;

        public UserCreator(ITimeProvider dateTimeProvider)
        {
            this.dateTimeProvider = dateTimeProvider;
        }

        public User Create(string userName, string hashedPassword)
        {
            var newUser = new User()
            {
                Name = userName,
                Password = hashedPassword,
                CreationDate = dateTimeProvider.GetTime(),
            };
            return newUser;
        }
    }
}
