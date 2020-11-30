using System;

namespace Wordki.Api.Featuers.Card.GetLastAdded
{
    public class LastAddedDto
    {
        public string GroupName { get; set; }
        public int Language1 { get; set; }
        public int Language2 { get; set; }
        public SideDto Heads { get; set; }
        public SideDto Tails { get; set; }
    }

    public class SideDto {
        public string Value{ get; set; }
        public string Example{ get; set; }
        public StateDto State{ get; set; }
    }

    public class StateDto{
        public int Drawer{ get; set; }
        public DateTime NextRepeat{ get; set; }
    }

    public static class DtoExtenstions{
        public static SideDto ConvertToDto(this Domain.Side side)
        => new SideDto
        {
            Value = side.Value,
            Example = side.Example,
            State = new StateDto
            {
                Drawer = side.State.Drawer.Value,
                NextRepeat = side.State.NextRepeat
            }
        };
    }
}
