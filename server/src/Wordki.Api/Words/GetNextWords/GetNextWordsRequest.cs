namespace Wordki.Api.Words.GetNextWords
{
    public class GetNextWordsRequest
    {
        public int Count { get; set; }
        public int Offset { get; set; }
        public int Question { get; set; }
        public int Answer { get; set; }
    }
}
