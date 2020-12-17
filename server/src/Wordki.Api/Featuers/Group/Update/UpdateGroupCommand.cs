using MediatR;

namespace Wordki.Api.Featuers.Group.Update
{
    public class UpdateGroupCommand : IRequest
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public int LanguageFront { get; set; }
        public int LanguageBack { get; set; }
    }
}
