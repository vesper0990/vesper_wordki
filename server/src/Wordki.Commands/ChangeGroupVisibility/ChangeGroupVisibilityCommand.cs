using System;
using Wordki.Utils.Commands;

namespace Wordki.Commands.ChangeGroupVisibility
{
    public class ChangeGroupVisibilityCommand : ICommand
    {
        public long Id { get; private set; }
        public bool IsAddedToLessons { get; private set; }

        private ChangeGroupVisibilityCommand() { }

        public static ChangeGroupVisibilityCommand Create(long id, bool? isAddedToLessons)
        {
            if (id <= 0)
            {
                throw new Exception("Id is less or equal 0");
            }
            if (!isAddedToLessons.HasValue)
            {
                throw new Exception("isAddedToLessons cannot be null");
            }

            return new ChangeGroupVisibilityCommand
            {
                Id = id,
                IsAddedToLessons = isAddedToLessons.Value
            };
        }
    }
}
