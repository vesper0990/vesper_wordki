import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-lesson-option',
  templateUrl: './lesson-option.component.html',
  styleUrls: ['./lesson-option.component.scss']
})
export class LessonOptionComponent {
  @Input() label: string;
  @Input() isDisabled: boolean;
  @Input() isSelected: boolean;
}
