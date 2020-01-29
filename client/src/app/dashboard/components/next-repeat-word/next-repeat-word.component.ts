import { Component, OnInit, Input } from '@angular/core';
import { RepeatWord } from '../../models/repeat-word.model';
import { DataProviderBase } from '../../services/data.provider/data.provider';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-next-repeat-word',
  templateUrl: './next-repeat-word.component.html',
  styleUrls: ['./next-repeat-word.component.scss']
})
export class NextRepeatWordComponent implements OnInit {

  word$: Observable<RepeatWord>;

  constructor(private dataProvider: DataProviderBase) { }

  ngOnInit() {
    this.word$ = this.dataProvider.getNextRepeatWord();
  }

}
