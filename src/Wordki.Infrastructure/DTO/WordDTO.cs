namespace Wordki.Infrastructure.DTO
{
    public class WordDTO
    {
        public long Id { get; set; }
        public long GroupId{get;set;}
        public string Language1{get;set;}
        public string Language2{get;set;}
        public string Language1Example{get;set;}
        public string Language2Example{get;set;}
        public int Drawer{get;set;}
    }
}
