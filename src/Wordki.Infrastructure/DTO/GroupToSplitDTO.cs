using Newtonsoft.Json;

namespace Wordki.Infrastructure.DTO
{
    public class GroupToSplitDTO
    {
        [JsonConverter(typeof(LongToStringConverter))]
        public long Id { get; set; }
        public int Factor { get; set; }

        public GroupToSplitDTO()
        {
        }
    }
}
