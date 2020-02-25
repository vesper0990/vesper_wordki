using Wordki.Core.Domain;
using Wordki.Utils.Domain;

public class RepeatMapper : IMapper<RepeatDto, Repeat>
{
    public Repeat Map(RepeatDto dto)
    {
        return Repeat.Restore(dto.Id, dto.WordId, dto.DateTime, dto.Result);
    }
}