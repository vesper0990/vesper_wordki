import { Component, OnInit, Input } from '@angular/core';
import { RepeatWord } from '../../models/repeat-word.model';
import { DataProviderBase } from '../../services/data.provider/data.provider';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CardModel } from 'src/app/share/components/card/card.model';

@Component({
  selector: 'app-next-repeat-word',
  templateUrl: './next-repeat-word.component.html',
  styleUrls: ['./next-repeat-word.component.scss']
})
export class NextRepeatWordComponent implements OnInit {

  word$: Observable<CardModel>;

  constructor(private dataProvider: DataProviderBase) { }

  ngOnInit() {
    this.word$ = this.dataProvider.getNextRepeatWord().pipe(map((item: RepeatWord) => {
      return {
        groupName: item.groupName,
        groupLanguage1: item.groupLanguage1,
        groupLanguage2: item.groupLanguage2,
        language1: item.language1,
        language2: item.language2,
        example1: item.example1,
        example2: item.example2,
        drawer: item.drawer,
        creationDate: item.creationDate,
        repeatsCount: item.repeatsCount,
        lastRepeat: item.lastRepeat
      } as CardModel;
    }));
  }

}
