import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CardParsed } from '../../model/card-parsed';
import { selectParsedCard } from '../../store/selectors';
import { GroupCreatorState } from '../../store/state';

@Component({
  selector: 'app-parsed-card',
  templateUrl: './parsed-card.component.html',
  styleUrls: ['./parsed-card.component.scss']
})
export class ParsedCardComponent implements OnInit {

  parsedCards$: Observable<CardParsed[]>;

  constructor(private readonly store: Store<GroupCreatorState>) { }

  ngOnInit(): void {
    this.parsedCards$ = this.store.select(selectParsedCard);

  }

}
