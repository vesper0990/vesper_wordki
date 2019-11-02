using System;

namespace Wordki.Core
{
    public class Word
    {
        private Word(Guid id, Guid groupId, string language1, string language2, string exapmle1, string exapmle2, string comment, Drawer drawer, bool isVisible, DateTime creationDate)
        {
            Id = id;
            GroupId = groupId;
            Language1 = language1;
            Language2 = language2;
            Exapmle1 = exapmle1;
            Exapmle2 = exapmle2;
            Comment = comment;
            Drawer = drawer;
            IsVisible = isVisible;
            CreationDate = creationDate;
        }

        public Guid Id { get; }
        public Guid GroupId { get; }
        public string Language1 { get; private set; }
        public string Language2 { get; private set; }
        public string Exapmle1 { get; private set; }
        public string Exapmle2 { get; private set; }
        public string Comment { get; }
        public Drawer Drawer { get; }
        public bool IsVisible { get; }
        public DateTime CreationDate { get; }

        public static Word Create(Guid groupId, string language1, string language2, string exapmle1, string example2, string comment, DateTime creationDate)
        {
            var id = Guid.NewGuid();
            var drawer = Drawer.Create();
            var isVisible = true;
            return new Word(id, groupId, language1, language2, exapmle1, example2, comment, drawer, isVisible, creationDate);
        }

        public static Word Restore(Guid id, Guid groupId, string language1, string language2, string exapmle1, string exapmle2,
            string comment, Drawer drawer, bool isVisible, DateTime creationDate)
        {
            return new Word(id, groupId, language1, language2, exapmle1, exapmle2, comment, drawer, isVisible, creationDate);
        }

        internal void Swap()
        {
            var temp = Language1;
            Language1 = Language2;
            Language2 = Language1;

            temp = Exapmle1;
            Exapmle1 = Exapmle2;
            Exapmle2 = temp;
        }
    }
}
