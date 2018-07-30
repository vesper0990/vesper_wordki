using Newtonsoft.Json;

namespace Wordki.Infrastructure.DTO
{
    public class UserDTO
    {
        [JsonConverter(typeof(LongToStringConverter))]
        public long Id { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }
        public string ApiKey { get; set; }

        public UserDTO()
        {

        }
    }
}
