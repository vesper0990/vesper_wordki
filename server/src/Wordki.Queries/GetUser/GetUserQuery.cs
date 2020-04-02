using Wordki.Utils;
using Wordki.Utils.Queries;

namespace Wordki.Queries.GetUser
{
    public class GetUserQuery : IQuery<GetUserDto>
    {
        private GetUserQuery() { }

        public string Name { get; private set; }
        public string Password { get; private set; }

        public static GetUserQuery Create(string userName, string password)
        {
            Condition.MustBeDefined(userName, nameof(userName));
            Condition.MustBeDefined(password, nameof(password));

            return new GetUserQuery()
            {
                Name = userName,
                Password = password
            };
        }

        
    }
}
