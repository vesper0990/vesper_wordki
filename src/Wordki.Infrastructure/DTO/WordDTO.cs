using Newtonsoft.Json;

namespace Wordki.Infrastructure.DTO
{
    public class WordDTO
    {
        [JsonConverter(typeof(LongToStringConverter))]
        public long Id { get; set; }
        [JsonConverter(typeof(LongToStringConverter))]
        public long GroupId{get;set;}
        public string Language1{get;set;}
        public string Language2{get;set;}
        public string Language1Example{get;set;}
        public string Language2Example{get;set;}
        public int Drawer{get;set;}
    }
}
