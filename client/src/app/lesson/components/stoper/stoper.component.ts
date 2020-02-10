import { Component, OnInit, OnDestroy } from '@angular/core';
import { StoperService } from '../../services/stoper/stoper.service';
import { Subscription } from 'rxjs';
import { LessonState } from '../../store/reducer';
import { Store } from '@ngrx/store';
import { StartLessonAction } from '../../store/actions';

@Component({
  selector: 'app-stoper',
  templateUrl: './stoper.component.html',
  styleUrls: ['./stoper.component.scss']
})
export class StoperComponent implements OnInit, OnDestroy {

  private stoperSubscription: Subscription;

  isRunning: boolean;

  constructor(private stoperService: StoperService,
    private lessonStore: Store<LessonState>) { }

  ngOnInit(): void {
    this.stoperSubscription = this.stoperService.getObservable().subscribe((value: boolean) => this.handleIsRunning(value));
  }

  ngOnDestroy(): void {
    this.stoperSubscription.unsubscribe();
  }

  start(): void {
    if (this.stoperService.getWholeTime() > 0) {
      this.stoperService.resume();
    } else {
      this.stoperService.restart();
      this.lessonStore.dispatch(new StartLessonAction());
    }
  }

  stop(): void {
    this.stoperService.stop();
    this.lessonStore.dispatch(new StartLessonAction());
  }

  private handleIsRunning(value: boolean): void {
    this.isRunning = value;
  }
}
