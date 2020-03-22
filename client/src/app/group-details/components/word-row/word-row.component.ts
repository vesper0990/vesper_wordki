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
  // background: string = 'linear-gradient(to right, #f00a 0%,  #fff0 1%);';

  @Output() editWord: EventEmitter<Word> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  edit(word: Word): void {
    this.editWord.emit(word);
  }

  toggle(): void {
    this.word.isExpanded = !this.word.isExpanded;
  }

}
