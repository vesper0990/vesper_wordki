import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { CardRepeat } from 'src/app/share/models/card-details';
import { LessonStep } from '../../models/lesson-state';
import { LessonCardDto } from '../../models/word-repeat.dto';
import { FiszkaService } from './services/fiszka/fiszka.service';

@Component({
  templateUrl: './fiszka.component.html',
  styleUrls: ['./fiszka.component.scss'],
})
export class FiszkaComponent implements OnInit, OnDestroy {

  private readonly arrowLeft = 'ArrowLeft';
  private readonly arrowRight = 'ArrowRight';
  private readonly enter = 'Enter';

  currentCard$: Observable<CardRepeat>;
  lessonStep$: Observable<LessonStep>;

  constructor(private readonly service: FiszkaService,
    private readonly titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('Wordki - Lesson');
    this.service.loadWords();
    this.currentCard$ = this.service.getCurrentCard();
    this.lessonStep$ = this.service.getLessonStep();
    this.service.init();

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

  check(): void {
    this.service.check();
  }

  correct(): void {
    this.service.correct();
  }

  wrong(): void {
    this.service.wrong();
  }
}
