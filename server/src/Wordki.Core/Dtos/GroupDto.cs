using System;
using System.Collections.Generic;
using Wordki.Utils.Domain;

namespace Wordki.Core.Dtos
{
    public class GroupDto : IDto
    {
        public long GroupId { get; set; }
        public long UserId { get; set; }
        public string Name { get; set; }
        public int GroupLanguage1 { get; set; }
        public int GroupLanguage2 { get; set; }
        public DateTime GroupCreationDate { get; set; }
        public IList<WordDto> Words { get; }

        public GroupDto()
        {
            Words = new List<WordDto>();
        }
    }
}
