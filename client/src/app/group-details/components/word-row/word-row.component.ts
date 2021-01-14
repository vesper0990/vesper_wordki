import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { CardDetails } from 'src/app/share/models/card-details';

@Component({
  selector: 'app-word-row',
  templateUrl: './word-row.component.html',
  styleUrls: ['./word-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WordRowComponent implements OnInit {

  _word: CardDetails;
  @Input()
  set word(value: CardDetails) {
    this._word = value;
  }

  lastRepeat: Date;

  @Output() editWord: EventEmitter<CardDetails> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }
}
