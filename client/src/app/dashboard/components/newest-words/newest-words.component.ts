import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LastWord } from '../../models/last-word.model';
import { DataProviderBase } from '../../services/data.provider/data.provider';

@Component({
  selector: 'app-newest-words',
  templateUrl: './newest-words.component.html',
  styleUrls: ['./newest-words.component.scss']
})
export class NewestWordsComponent implements OnInit {

  words$: Observable<LastWord[]>;

  constructor(private dataProvider: DataProviderBase) { }

  ngOnInit() {
    this.words$ = this.dataProvider.getLastWords(3);
  }

}
