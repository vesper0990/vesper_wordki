using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Wordki.Api.Domain2;
using Wordki.Api.Responses;
using Wordki.Utils.HttpContext;
using Wordki.Utils.TimeProvider;

namespace Wordki.Api.Featuers.Card.GetRepeatsWithParams
{
    public class GetRepeatsWithParamsQuery : IRequest<IEnumerable<CardRepeatDto>>
    {
        public int? Count { get; set; }
        public int? Source { get; set; }
        public int? Question { get; set; }
        public int? Answer { get; set; }
    }

    public class GetRepeatsCountWithParamsQuery : IRequest<int>
    {
        public int? Source { get; set; }
        public int? Question { get; set; }
        public int? Answer { get; set; }
    }

    public class GetRepeatsCountWithParamsHandler : IRequestHandler<GetRepeatsCountWithParamsQuery, int>
    {

        private readonly WordkiDbContext2 dbContext;
        private readonly ITimeProvider timeProvider;
        private readonly IHttpContextProvider contextProvider;

        public GetRepeatsCountWithParamsHandler(WordkiDbContext2 dbContext,
            ITimeProvider timeProvider,
            IHttpContextProvider contextProvider)
        {
            this.dbContext = dbContext;
            this.timeProvider = timeProvider;
            this.contextProvider = contextProvider;
        }

        public async Task<int> Handle(GetRepeatsCountWithParamsQuery request, CancellationToken cancellationToken)
        {
            var userId = contextProvider.GetUserId();
            var userCards = dbContext.Details
            .Include(d => d.Card)
            .ThenInclude(c => c.Group)
            .Where(d => d.Owner.Id == userId);

            if (request.Source.HasValue)
            {
                if (request.Source == 0) //nowe
                {
                    userCards = userCards.Where(c => c.NextRepeatDate == null);
                }
                else
                {
                    userCards = userCards.Where(c =>
                        c.NextRepeatDate != null &&
                        c.NextRepeatDate < timeProvider.GetTime());
                }
            }

            if (request.Question.HasValue)
            {
                userCards = userCards.Where(d =>
                    d.Direction == Domain.QuestionSideEnum.Front && d.Card.Group.FrontLanguage == request.Question ||
                    d.Direction == Domain.QuestionSideEnum.Back && d.Card.Group.BackLanguage == request.Question);
            }

            if (request.Answer.HasValue)
            {
                userCards = userCards.Where(d =>
                    d.Direction == Domain.QuestionSideEnum.Back && d.Card.Group.FrontLanguage == request.Answer ||
                    d.Direction == Domain.QuestionSideEnum.Front && d.Card.Group.BackLanguage == request.Answer);
            }

            var results = await userCards.ToListAsync();

            return await userCards.CountAsync();
        }
    }

    public class GetRepeatsWithParamsHandler : IRequestHandler<GetRepeatsWithParamsQuery, IEnumerable<CardRepeatDto>>
    {
        private readonly WordkiDbContext2 dbContext;
        private readonly ITimeProvider timeProvider;
        private readonly IHttpContextProvider contextProvider;

        public GetRepeatsWithParamsHandler(WordkiDbContext2 dbContext,
            ITimeProvider timeProvider,
            IHttpContextProvider contextProvider)
        {
            this.dbContext = dbContext;
            this.timeProvider = timeProvider;
            this.contextProvider = contextProvider;
        }

        public Task<IEnumerable<CardRepeatDto>> Handle(GetRepeatsWithParamsQuery request, CancellationToken cancellationToken)
        {
            var userId = contextProvider.GetUserId();
            var userCards = dbContext.Details
            .Include(d => d.Card)
            .ThenInclude(c => c.Group)
            .Where(d => d.Owner.Id == userId);

            if (request.Source.HasValue)
            {
                if (request.Source == 0) //nowe
                {
                    userCards = userCards.Where(c => c.NextRepeatDate == null);
                }
                else
                {
                    userCards = userCards.Where(c =>
                        c.NextRepeatDate != null &&
                        c.NextRepeatDate < timeProvider.GetTime());
                }
            }

            if (request.Question.HasValue)
            {
                userCards = userCards.Where(d =>
                    d.Direction == Domain.QuestionSideEnum.Front && d.Card.Group.FrontLanguage == request.Question ||
                    d.Direction == Domain.QuestionSideEnum.Back && d.Card.Group.BackLanguage == request.Question);
            }

            if (request.Answer.HasValue)
            {
                userCards = userCards.Where(d =>
                    d.Direction == Domain.QuestionSideEnum.Back && d.Card.Group.FrontLanguage == request.Answer ||
                    d.Direction == Domain.QuestionSideEnum.Front && d.Card.Group.BackLanguage == request.Answer);
            }

            return Task.FromResult<IEnumerable<CardRepeatDto>>(
                userCards.Select(d => ConvertIntoRepeatDto(d)));
        }

        public static CardRepeatDto ConvertIntoRepeatDto(Domain2.CardDetails details)
            => new CardRepeatDto
            {
                Id = details.Card.Id,
                DetailsId = details.Id,
                Question = new SideRepeatDto
                {
                    Value = details.Direction == Domain.QuestionSideEnum.Front ? details.Card.FrontValue : details.Card.BackValue,
                    Example = details.Direction == Domain.QuestionSideEnum.Front ? details.Card.FrontExample : details.Card.BackExample,
                    Drawer = details.Drawer,
                    Language = details.Question
                },
                Answer = new SideRepeatDto
                {
                    Value = details.Direction == Domain.QuestionSideEnum.Front ? details.Card.BackValue : details.Card.FrontValue,
                    Example = details.Direction == Domain.QuestionSideEnum.Front ? details.Card.BackExample : details.Card.FrontExample,
                    Language = details.Answer
                }
            };
    }

    public class ParameterReplaceVisitor : ExpressionVisitor
    {
        private readonly ParameterExpression from;
        private readonly Expression to;

        public ParameterReplaceVisitor(ParameterExpression from, Expression to)
        {
            this.from = from;
            this.to = to;
        }

        protected override Expression VisitParameter(ParameterExpression node)
        {
            return node == from ? to : node;
        }
    }

    public static class ExpressionExtensions
    {
        public static Expression<Func<T, bool>> And<T>(this Expression<Func<T, bool>> left, Expression<Func<T, bool>> right)
        {
            var visitor = new ParameterReplaceVisitor(right.Parameters[0], left.Parameters[0]);

            var rewritenRight = visitor.Visit(right.Body);
            var exprBody = rewritenRight != null ? Expression.AndAlso(left.Body, rewritenRight) : left.Body;
            var finalExpr = Expression.Lambda<Func<T, bool>>(exprBody, left.Parameters);

            return finalExpr;
        }

        public static Expression<Func<T, bool>> Or<T>(this Expression<Func<T, bool>> left, Expression<Func<T, bool>> right)
        {
            var visitor = new ParameterReplaceVisitor(right.Parameters[0], left.Parameters[0]);

            var rewritenRight = visitor.Visit(right.Body);
            var exprBody = rewritenRight != null ? Expression.OrElse(left.Body, rewritenRight) : left.Body;
            var finalExpr = Expression.Lambda<Func<T, bool>>(exprBody, left.Parameters);

            return finalExpr;
        }

        public static Expression ReplaceParameter(this Expression expression, ParameterExpression toReplace, Expression newExpression)
        {
            return new ParameterReplaceVisitor(toReplace, newExpression).Visit(expression);
        }

        public static Expression<Func<TSource, TResult>> Compose<TSource, TIntermediate, TResult>(this Expression<Func<TSource, TIntermediate>> first, Expression<Func<TIntermediate, TResult>> second)
        {
            var param = Expression.Parameter(typeof(TSource));
            var intermediateValue = first.Body.ReplaceParameter(first.Parameters[0], param);
            var body = second.Body.ReplaceParameter(second.Parameters[0], intermediateValue);
            return Expression.Lambda<Func<TSource, TResult>>(body, param);
        }
    }
}