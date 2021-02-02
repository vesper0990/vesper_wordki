import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { LessonType } from 'src/app/share/models/card-details';
import { SetLessonType } from '../../store/actions';
import { LessonState } from '../../store/state';

@Component({
  selector: 'app-lesson-type-selector',
  templateUrl: './lesson-type-selector.component.html',
  styleUrls: ['./lesson-type-selector.component.scss']
})
export class LessonTypeSelectorComponent {

  options = LessonType.getAll().map(type => {
    return {
      isDisabled: false,
      isSelected: false,
      label: type.label,
      value: type
    };
  });

  constructor(private readonly store: Store<LessonState>) { }

  selectLessonType(item: any): void {
    this.options.forEach(x => x.isSelected = false);
    item.isSelected = true;
    this.store.dispatch(new SetLessonType({ lessonType: item.value }));
  }

}
