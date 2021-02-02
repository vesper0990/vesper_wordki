import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { LessonSource } from '../../models/lesson-source';
import { SetLessonSize, SetLessonSource } from '../../store/actions';
import { selectMaxCardsCount } from '../../store/selectors';
import { LessonState } from '../../store/state';

@Component({
  selector: 'app-lesson-source-selector',
  templateUrl: './lesson-source-selector.component.html',
  styleUrls: ['./lesson-source-selector.component.scss']
})
export class LessonSourceSelectorComponent implements OnInit {

  range: number;
  maxValue: number;

  maxValue$: Observable<number>;
  isCountSelectorDisabled$: Observable<boolean>;


  options = LessonSource.getAll().map(type => {
    return {
      isDisabled: false,
      isSelected: false,
      label: type.label,
      value: type
    };
  });

  constructor(private readonly store: Store<LessonState>) { }

  ngOnInit(): void {
    this.range = 0;
    this.maxValue$ = this.store.select(selectMaxCardsCount).pipe(
      tap(value => this.maxValue = value)
    );
    this.isCountSelectorDisabled$ = this.store.select(selectMaxCardsCount).pipe(
      map(value => value === 0)
    );
  }

  selectLessonSource(item: any): void {
    if (this.options.find(x => x.isSelected) !== item) {
      this.range = 0;
      this.updateStore();
    }
    this.options.forEach(x => x.isSelected = false);
    item.isSelected = true;
    this.store.dispatch(new SetLessonSource({ lessonSource: item.value }));
  }

  changeRange(difference: number): void {
    let temp = this.range;
    temp += difference;
    if (temp < 1) {
      temp = 1;
    }
    if (temp > this.maxValue) {
      temp = this.maxValue;
    }
    this.range = temp;
    this.updateStore();
  }

  blur(): void {
    this.updateStore();
  }

  private updateStore(): void {
    console.log('value:', this.range);
    this.store.dispatch(new SetLessonSize({ lessonSize: this.range }));
  }

}
