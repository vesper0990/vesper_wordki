import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LessonStep } from '../../models/lesson-state';
import { StoperService } from './services/stoper/stoper.service';

@Component({
  selector: 'app-stoper',
  templateUrl: './stoper.component.html',
  styleUrls: ['./stoper.component.scss']
})
export class StoperComponent implements OnInit, OnDestroy {

  lessonStep$: Observable<LessonStep>;
  time$: Observable<number>;

  constructor(private readonly service: StoperService) { }

  ngOnInit(): void {
    this.service.init();
    this.lessonStep$ = this.service.getLessonStep();
    this.time$ = this.service.getTime();
  }

  ngOnDestroy(): void {
    this.service.finalize();
  }

  clickStart(): void {
    this.service.start();
  }

  clickPause(): void {
    this.service.pause();
  }

  clickResume(): void {
    this.service.resume();
  }

  clickFinish(): void {
    this.service.finish();
  }
}
