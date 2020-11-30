using Wordki.Api.Featuers.Card.Dto;

namespace Wordki.Api.Featuers.Card.GetAllRepeat
{
    public class RepeatDto
    {
        public long Id { get; set; }
        public string GroupName { get; set; }
        public SideDto Question { get; set; }
        public SideDto Answer { get; set; }
    }


    public static class Extensions
    {
        public static RepeatDto ConvertIntoRepeatDto(this Domain.Card card, bool revert = false)
        => revert 
        ? new RepeatDto
        {
            GroupName = card.Group.Name,
            Id = card.Id,
            Answer = new SideDto
            {
                Value = card.Heads.Value,
                Example = card.Heads.Example,
                Drawer = card.Heads.State.Drawer.Value,
                Language =  card.Group.GroupLanguage1
            },
            Question = new SideDto
            {
                Value = card.Tails.Value,
                Example = card.Tails.Example,
                Drawer = card.Tails.State.Drawer.Value,
                Language =  card.Group.GroupLanguage2
            }
        }
        : new RepeatDto
        {
            GroupName = card.Group.Name,
            Id = card.Id,
            Question = new SideDto
            {
                Value = card.Heads.Value,
                Example = card.Heads.Example,
                Drawer = card.Heads.State.Drawer.Value,
                Language =  card.Group.GroupLanguage1
            },
            Answer = new SideDto
            {
                Value = card.Tails.Value,
                Example = card.Tails.Example,
                Drawer = card.Tails.State.Drawer.Value,
                Language =  card.Group.GroupLanguage2
            }
        };

    }
}