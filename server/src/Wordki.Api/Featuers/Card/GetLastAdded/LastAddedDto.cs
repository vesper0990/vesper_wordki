using Wordki.Api.Domain;

namespace Wordki.Api.Featuers.Card.GetLastAdded
{
    public class LastAddedDto
    {
        public string GroupName { get; set; }
        public int Language1 { get; set; }
        public int Language2 { get; set; }
        public Side Side1 { get; set; }
        public Side Side2 { get; set; }
        public string Comment { get; set; }
        public int Drawer { get; set; }
        public bool IsVisible { get; set; }
    }
}
