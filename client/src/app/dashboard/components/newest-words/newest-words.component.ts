import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataProviderBase } from '../../services/data.provider/data.provider';
import { CardModel } from 'src/app/share/components/card/card.model';
import { map } from 'rxjs/operators';
import { RepeatWordDto } from '../../models/reapeat-word.dto';
import { RepeatWord } from '../../models/repeat-word.model';

@Component({
  selector: 'app-newest-words',
  templateUrl: './newest-words.component.html',
  styleUrls: ['./newest-words.component.scss']
})
export class NewestWordsComponent implements OnInit {

  words$: Observable<CardModel[]>;

  constructor(private dataProvider: DataProviderBase) { }

  ngOnInit() {
    this.words$ = this.dataProvider.getLastWords(3).pipe(map((items: RepeatWord[]) => {
      const arr = [];
      items.forEach((item: RepeatWord) => {
        arr.push({
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
        } as CardModel);
      });
      return arr;
    }));
  }

}
