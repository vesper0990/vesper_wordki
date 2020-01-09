import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Word } from '../../models/word.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-word-row',
  templateUrl: './word-row.component.html',
  styleUrls: ['./word-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WordRowComponent implements OnInit {

  @Input() word: Word;

  constructor(private router: Router) { }

  ngOnInit() {
  }

}
