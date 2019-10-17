using System;
using Wordki.Utils.Domain;

namespace Wordki.Core.Dtos
{
    public class UserDto : IDto
    {
        public byte[] Guid { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }
        public DateTime CreationDate { get; set; }
        public DateTime? LastLoginDate { get; set; }
    }
}
