using Newtonsoft.Json;

namespace Wordki.Infrastructure.DTO
{
    public class ExceptionMessage
    {
        public ErrorCode Code { get; set; }
        public string Message { get; set; }

        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }
    }
}
