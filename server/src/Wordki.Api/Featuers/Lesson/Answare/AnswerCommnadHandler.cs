using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Runtime.Serialization;
using System.Threading;
using System.Threading.Tasks;
using Wordki.Api.Domain;
using Wordki.Api.Domain2;
using Wordki.Api.Services;
using Wordki.Utils.HttpContext;
using Wordki.Utils.TimeProvider;
using Repeat = Wordki.Api.Domain2.Repeat;

namespace Wordki.Api.Featuers.Lesson.Answer
{
    public class AnswerCommnadHandler : IRequestHandler<AnswerCommand>
    {
        private readonly WordkiDbContext2 dbContext;
        private readonly IHttpContextProvider contextProvider;
        private readonly INextRepeatCalculator nextRepeatCalculator;
        private readonly ITimeProvider timeProvider;

        public AnswerCommnadHandler(
            WordkiDbContext2 dbContext,
            IHttpContextProvider contextProvider,
            INextRepeatCalculator nextRepeatCalculator,
            ITimeProvider timeProvider)
        {
            this.dbContext = dbContext;
            this.contextProvider = contextProvider;
            this.nextRepeatCalculator = nextRepeatCalculator;
            this.timeProvider = timeProvider;
        }

        public async Task<Unit> Handle(AnswerCommand request, CancellationToken cancellationToken)
        {
            var userId = contextProvider.GetUserId();
            if (userId == 0)
            {
                throw new ApiException("userId == 0");
            }
            var cardDetails = await dbContext.Details
            .Include(d => d.Repeats)
            .SingleOrDefaultAsync(d => d.Id == request.CardDetailId && d.Owner.Id == userId);

            if (cardDetails == null)
            {
                throw new ApiException($"CardDetails not found for id {request.CardDetailId}");
            }

            var lesson = await dbContext.Lessons
            .SingleOrDefaultAsync(l => l.Id == request.LessonId && l.Owner.Id == userId, cancellationToken);

            if (lesson == null)
            {
                throw new ApiException($"Lesson not found for id {request.LessonId}");
            }

            var repeat = new Repeat
            {
                Details = cardDetails,
                Lesson = lesson,
                Result = (int)request.Result,
                Time = timeProvider.GetTime()
            };
            cardDetails.Repeats.Add(repeat);
            lesson.Repeats.Add(repeat);

            UpdateDrawer(cardDetails, request.Result);

            var nextRepat = nextRepeatCalculator.Calculate(cardDetails);
            cardDetails.NextRepeatDate = nextRepat;

            await dbContext.SaveChangesAsync(cancellationToken);
            return Unit.Value;
        }

        private void UpdateDrawer(CardDetails details, RepeatResultEnum repeatResult)
        {
            switch (repeatResult)
            {
                case RepeatResultEnum.Correct:
                    {
                        details.Drawer += 1;
                        break;
                    }
                case RepeatResultEnum.Wrong:
                    {
                        details.Drawer = 0;
                        break;
                    }
            }
        }

        [System.Serializable]
        private class ApiException : System.Exception
        {
            public ApiException()
            {
            }

            public ApiException(string message) : base(message)
            {
            }

            public ApiException(string message, System.Exception innerException) : base(message, innerException)
            {
            }

            protected ApiException(SerializationInfo info, StreamingContext context) : base(info, context)
            {
            }
        }
    }
}
