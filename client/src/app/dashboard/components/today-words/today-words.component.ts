import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataProviderBase } from '../../services/data.provider/data.provider';
import { RepeatWord } from '../../models/repeat-word.model';

@Component({
  selector: 'app-today-words',
  templateUrl: './today-words.component.html',
  styleUrls: ['./today-words.component.scss']
})
export class TodayWordsComponent implements OnInit {

  wordsCount$: Observable<number>;

  constructor(private dataProvider: DataProviderBase) { }

  ngOnInit(): void {
    this.wordsCount$ = this.dataProvider.getCountWordsByDate();
  }

}
