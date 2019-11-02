import { Component, OnInit, Input } from '@angular/core';
import { Word } from '../../models/Word';

@Component({
  selector: 'app-word-form',
  templateUrl: './word-form.component.html',
  styleUrls: ['./word-form.component.scss']
})
export class WordFormComponent implements OnInit {

  @Input() word: Word;

  ngOnInit(): void {
    if (!this.word) {
      this.word = new Word();
    }
  }
}
