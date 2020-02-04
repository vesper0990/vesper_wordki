import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Word } from '../../models/word.model';

@Component({
  selector: 'app-word-row',
  templateUrl: './word-row.component.html',
  styleUrls: ['./word-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WordRowComponent implements OnInit {

  @Input() word: Word;

  @Output() editWord: EventEmitter<Word> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  edit(word: Word): void {
    this.editWord.emit(word);
  }

}
