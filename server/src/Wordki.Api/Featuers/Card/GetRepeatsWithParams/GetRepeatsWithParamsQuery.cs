using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Wordki.Api.Repositories.EntityFrameworkRepositories;
using Wordki.Api.Responses;
using Wordki.Utils.HttpContext;
using Wordki.Utils.TimeProvider;

namespace Wordki.Api.Featuers.Card.GetRepeatsWithParams
{
    public class GetRepeatsWithParamsQuery : IRequest<IEnumerable<CardRepeatDto>>
    {
        public int? Count { get; set; }
        public int? Source { get; set; }
        public int? QuestionLanguage { get; set; }
        public int? AnswerLanguage { get; set; }
    }

    public class GetRepeatsCountWithParamsQuery : IRequest<int>
    {
        public int? Source { get; set; }
        public int[] Langauges { get; set; }
    }

    public class GetRepeatsCountWithParamsHandler : IRequestHandler<GetRepeatsCountWithParamsQuery, int>
    {

        private readonly WordkiDbContext dbContext;
        private readonly ITimeProvider timeProvider;
        private readonly IHttpContextProvider contextProvider;

        public GetRepeatsCountWithParamsHandler(WordkiDbContext dbContext,
            ITimeProvider timeProvider,
            IHttpContextProvider contextProvider)
        {
            this.dbContext = dbContext;
            this.timeProvider = timeProvider;
            this.contextProvider = contextProvider;
        }

        public Task<int> Handle(GetRepeatsCountWithParamsQuery request, CancellationToken cancellationToken)
        {
            return null;
        }

        private Expression<Func<Domain.Card, bool>> CreateExpression(GetRepeatsCountWithParamsQuery request, long userId)
        {
            var finalExpression = UserExpression(userId);
            if (request.Source.HasValue)
                finalExpression = finalExpression.And(SourceExpression(request.Source.Value));

            if (request.Langauges.Length == 1)
                finalExpression = finalExpression.And(SourceExpression(request.Source.Value));

            return finalExpression;
        }

        private Expression<Func<Domain.Card, bool>> UserExpression(long userId)
        {
            Expression<Func<Domain.Card, bool>> result = card => card.Group.Owner.Id == userId;
            return result;
        }

        private Expression<Func<Domain.Card, bool>> SourceExpression(int source)
        {
            Expression<Func<Domain.Card, bool>> newExpr = card => !card.Front.State.IsVisible || !card.Back.State.IsVisible;
            Expression<Func<Domain.Card, bool>> repExpr = card => card.Front.State.IsVisible || card.Back.State.IsVisible;
            return source == 0 ? newExpr : repExpr;
        }

        private Expression<Func<Domain.Card, bool>> FrontLanguageExpression(Domain.Card card, int source)
        {
            return card => card.Front.State.NextRepeat < timeProvider.GetDate();
        }

        private Expression<Func<Domain.Card, bool>> BackLanguageExpression(Domain.Card card, int source)
        {
            return card => card.Back.State.NextRepeat < timeProvider.GetDate();
        }
    }

    public class GetRepeatsWithParamsHandler : IRequestHandler<GetRepeatsWithParamsQuery, IEnumerable<CardRepeatDto>>
    {
        private readonly WordkiDbContext dbContext;
        private readonly ITimeProvider timeProvider;
        private readonly IHttpContextProvider contextProvider;

        public GetRepeatsWithParamsHandler(WordkiDbContext dbContext,
            ITimeProvider timeProvider,
            IHttpContextProvider contextProvider)
        {
            this.dbContext = dbContext;
            this.timeProvider = timeProvider;
            this.contextProvider = contextProvider;
        }

        private Expression<Func<Domain.Card, bool>> UserExpression(Domain.Card card, long userId) => card => card.Group.Owner.Id == userId;

        private Expression<Func<Domain.Card, bool>> SourceExpression(Domain.Card card, int source)
        {
            Expression<Func<Domain.Card, bool>> newExpr = card => !card.Front.State.IsVisible || !card.Back.State.IsVisible;
            Expression<Func<Domain.Card, bool>> repExpr = card => card.Front.State.IsVisible || card.Back.State.IsVisible;
            return source == 0 ? newExpr : repExpr;
        }

        private Expression<Func<Domain.Card, bool>> FrontLanguageExpression(Domain.Card card, int source)
        {
            return card => card.Front.State.NextRepeat < timeProvider.GetDate();
        }

        private Expression<Func<Domain.Card, bool>> BackLanguageExpression(Domain.Card card, int source)
        {
            return card => card.Back.State.NextRepeat < timeProvider.GetDate();
        }

        public Task<IEnumerable<CardRepeatDto>> Handle(GetRepeatsWithParamsQuery request, CancellationToken cancellationToken)
        {
            var userId = contextProvider.GetUserId();
            var results = new List<CardRepeatDto>();

            return null;
        }

        public static CardRepeatDto ConvertIntoRepeatDto(Domain.Card card, bool revert = false)
        => revert
        ? new CardRepeatDto
        {
            Id = card.Id,
            Answer = new SideRepeatDto
            {
                Value = card.Front.Value,
                Example = card.Front.Example,
                Drawer = card.Front.State.Drawer.Value,
                Language = card.Group.FrontLanguage
            },
            Question = new SideRepeatDto
            {
                Value = card.Back.Value,
                Example = card.Back.Example,
                Drawer = card.Back.State.Drawer.Value,
                Language = card.Group.BackLanguage
            }
        }
        : new CardRepeatDto
        {
            Id = card.Id,
            Question = new SideRepeatDto
            {
                Value = card.Front.Value,
                Example = card.Front.Example,
                Drawer = card.Front.State.Drawer.Value,
                Language = card.Group.FrontLanguage
            },
            Answer = new SideRepeatDto
            {
                Value = card.Back.Value,
                Example = card.Back.Example,
                Drawer = card.Back.State.Drawer.Value,
                Language = card.Group.BackLanguage
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