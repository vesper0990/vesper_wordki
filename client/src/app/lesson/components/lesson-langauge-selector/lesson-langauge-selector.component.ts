import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, forkJoin, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { SetLessonAllLanguages, SetLessonLanguage, UnsetLessonLanguage } from '../../store/actions';
import { selectLanguages, selectSelectedLanguages } from '../../store/selectors';
import { LessonState } from '../../store/state';

@Component({
  selector: 'app-lesson-langauge-selector',
  templateUrl: './lesson-langauge-selector.component.html',
  styleUrls: ['./lesson-langauge-selector.component.scss']
})
export class LessonLangaugeSelectorComponent implements OnInit {

  options$: Observable<any[]>;

  constructor(private readonly store: Store<LessonState>) { }

  ngOnInit(): void {
    this.options$ = combineLatest([
      this.store.select(selectSelectedLanguages),
      this.store.select(selectLanguages)
    ]).pipe(
      map(([selected, possible]) =>
        possible.map(item => {
          return {
            label: item,
            isSelected: selected.includes(item)
          };
        })
      )
    );
  }

  selectAll(): void {
    this.store.dispatch(new SetLessonAllLanguages());
  }

  selectItem(item: number, isSelected: boolean): void {
    this.store.dispatch(
      isSelected ?
        new UnsetLessonLanguage({ language: item }) :
        new SetLessonLanguage({ language: item })
    );
  }

}
