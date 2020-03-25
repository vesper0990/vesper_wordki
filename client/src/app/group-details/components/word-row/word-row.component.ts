import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Word } from '../../models/word.model';

@Component({
  selector: 'app-word-row',
  templateUrl: './word-row.component.html',
  styleUrls: ['./word-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WordRowComponent implements OnInit {

  _word: Word;
  @Input()
  set word(value: Word) {
    this._word = value;
    this.setLastRepeat();
  }

  lastRepeat: Date;
  // background: string = 'linear-gradient(to right, #f00a 0%,  #fff0 1%);';

  @Output() editWord: EventEmitter<Word> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  private setLastRepeat(): void {
    if (this._word.repeats.length === 0) {
      this.lastRepeat = null;
      return;
    }
    this.lastRepeat = this._word.repeats[this._word.repeats.length - 1].date;
  }

  edit(word: Word): void {
    this.editWord.emit(word);
  }

  toggle(): void {
    this._word.isExpanded = !this._word.isExpanded;
  }

}
