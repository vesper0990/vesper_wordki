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
    this.setLastRepeat();
  }

  lastRepeat: Date;

  @Output() editWord: EventEmitter<CardDetails> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  private setLastRepeat(): void {
    // if (!this._word || !this._word.repeats) {
    //   return;
    // }
    // if (this._word && this._word.repeats && this._word.repeats.length === 0) {
    //   this.lastRepeat = null;
    //   return;
    // }
    // this.lastRepeat = this._word.repeats[this._word.repeats.length - 1].date;
  }

  edit(word: CardDetails): void {
    this.editWord.emit(word);
  }

}
