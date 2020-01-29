import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RepeatWord } from '../../models/repeat-word.model';
import { DataProviderBase } from '../../services/data.provider/data.provider';

@Component({
  selector: 'app-last-failed-repeat',
  templateUrl: './last-failed-repeat.component.html',
  styleUrls: ['./last-failed-repeat.component.scss']
})
export class LastFailedRepeatComponent implements OnInit {

  word$: Observable<RepeatWord>;

  constructor(private dataProvider: DataProviderBase) { }

  ngOnInit() {
    this.word$ = this.dataProvider.getLastFailed();
  }

}
