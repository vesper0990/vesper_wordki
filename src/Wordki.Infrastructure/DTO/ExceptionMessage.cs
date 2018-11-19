using Newtonsoft.Json;

namespace Wordki.Infrastructure.DTO
{
    public class ExceptionMessage
    {
        public ErrorCode Code { get; set; }
        public string Message { get; set; }

        public ExceptionMessage(ErrorCode code, string message)
        {
            Code = code;
            Message = message;
        }

        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }
    }
}
