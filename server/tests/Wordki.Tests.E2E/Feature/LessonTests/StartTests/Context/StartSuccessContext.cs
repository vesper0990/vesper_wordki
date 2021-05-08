using Wordki.Api.Domain2;

namespace Wordki.Tests.E2E.Feature.LessonTests.StartTests
{
    public abstract class StartSuccessContext
    {
        public abstract User GivenEntity { get; }
        public abstract Lesson ExpectedLesson { get; }
    }
}