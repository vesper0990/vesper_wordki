﻿using MediatR;
using Wordki.Api.Domain;

namespace Wordki.Api.Featuers.Card.Update
{
    public class UpdateCardCommand : IRequest
    {
        public long Id { get; set; }
        public Word CardSide1 { get; set; }
        public Word CardSide2 { get; set; }
        public string Comment { get; set; }
        public bool IsVisible { get; set; }
    }
}