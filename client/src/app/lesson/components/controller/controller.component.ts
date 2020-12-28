import { EventEmitter } from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';
import { LessonStep } from '../../models/lesson-state';

@Component({
  selector: 'app-controller',
  templateUrl: './controller.component.html',
  styleUrls: ['./controller.component.scss']
})
export class ControllerComponent implements OnInit {

  @Input() lessonStep: LessonStep;
  @Output() correct = new EventEmitter();
  @Output() wrong = new EventEmitter();
  @Output() check = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  clickCorrect(): void {
    this.correct.emit({} as any);
  }

  clickWrong(): void {
    this.wrong.emit({} as any);
  }

  clickCheck(): void {
    this.check.emit({} as any);
  }

}
