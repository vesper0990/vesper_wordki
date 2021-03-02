using Wordki.Utils.TimeProvider;

namespace Wordki.Api.Services
{
    public interface IUserCreator
    {
        Domain2.User Create(string userName, string hashedPassword);
    }
    public class UserCreator : IUserCreator
    {
        private readonly ITimeProvider dateTimeProvider;

        public UserCreator(ITimeProvider dateTimeProvider)
        {
            this.dateTimeProvider = dateTimeProvider;
        }

        public Domain2.User Create(string userName, string hashedPassword)
        {
            var newUser = new Domain2.User()
            {
                Name = userName,
                Password = hashedPassword,
                CreationDate = dateTimeProvider.GetTime(),
            };
            return newUser;
        }
    }
}
