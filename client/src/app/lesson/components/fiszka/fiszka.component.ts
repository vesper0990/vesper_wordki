import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Observable } from 'rxjs';
import { LessonStep } from '../../models/lesson-state';
import { WordRepeat } from '../../models/word-repeat';
import { FiszkaService } from './services/fiszka/fiszka.service';

@Component({
  templateUrl: './fiszka.component.html',
  styleUrls: ['./fiszka.component.scss'],
  providers: [FiszkaService]
})
export class FiszkaComponent implements OnInit, OnDestroy {

  private readonly arrowLeft = 'ArrowLeft';
  private readonly arrowRight = 'ArrowRight';
  private readonly enter = 'Enter';

  currentCard$: Observable<WordRepeat>;
  lessonStep$: Observable<LessonStep>;

  constructor(private readonly service: FiszkaService) { }

  ngOnInit(): void {
    this.service.loadWords();
    this.currentCard$ = this.service.getCurrentCard();
    this.lessonStep$ = this.service.getLessonStep();
    this.service.init()

  }

  ngOnDestroy(): void {
    this.service.unsubsccribe();
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent): void {
    switch (event.key) {
      case this.arrowRight:
        this.correct();
        break;
      case this.arrowLeft:
        this.wrong();
        break;
      case this.enter:
        this.check();
        break;
    }
  }

  startLesson(): void {
    this.service.startLesson();
  }

  check(): void {
    this.service.check();
  }

  correct(): void {
    this.service.correct();
  }

  wrong(): void {
    this.service.wrong();
  }

  finishLesson(): void {
    this.service.finishLesson()
  }

  pause(): void {
    this.service.pause();
  }

  restart(): void {
    this.service.restart();
  }
}
