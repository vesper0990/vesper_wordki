using System;
using Wordki.Core.Enums;

namespace Wordki.Infrastructure.DTO
{
    public class ResultDTO
    {
        public long Id { get; set; }
        public long GroupId { get; set; }
        public short Correct { get; set; }
        public short Accepted { get; set; }
        public short Wrong { get; set; }
        public short Invisible { get; set; }
        public short TimeCount { get; set; }
        public TranslationDirection TranslationDirection { get; set; }
        public LessonType LessonType { get; set; }
        public DateTime? DateTime { get; set; }

        public ResultDTO()
        {
        }

    }
}
