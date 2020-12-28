import { Component, OnInit, OnDestroy, HostListener, ViewChild, ElementRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { CardRepeat } from 'src/app/share/models/card-details';
import { LessonStateEnum, LessonStep } from '../../models/lesson-state';
import { InsertService } from './service/insert/insert.service';

@Component({
    templateUrl: './insert.component.html',
    styleUrls: ['./insert.component.scss']
})
export class InsertComponent implements OnInit, OnDestroy {
    private readonly arrowLeft = 'ArrowLeft';
    private readonly arrowRight = 'ArrowRight';
    private readonly enter = 'Enter';
    private comparisonResultSub: Subscription;

    @ViewChild('answerElement') inputElement: ElementRef;
    currentCard$: Observable<CardRepeat>;
    lessonStep$: Observable<LessonStep>;
    isPause$: Observable<boolean>;

    comparisonResult: string;
    value: string;
    isCorrect: boolean;
    isWrong: boolean;
    isReadyToCheck: boolean;

    constructor(private readonly service: InsertService,
        private readonly titleService: Title) { }

    ngOnInit(): void {
        this.titleService.setTitle('Wordki - Lesson');
        this.service.loadWords();
        this.currentCard$ = this.service.getCurrentCard();
        this.lessonStep$ = this.service.getLessonStep().pipe(
            tap(lessonStep => {
                if (lessonStep.step === LessonStateEnum.QUESTION) {
                    setTimeout(() => {
                        this.inputElement.nativeElement.focus();
                    }, 0);
                    this.value = '';
                }
            })
        );
        this.comparisonResultSub = this.service.getComparisonResult().subscribe(
            value => {
                this.isCorrect = value === 'correct';
                this.isWrong = value === 'wrong';
                this.isReadyToCheck = value === 'none';
            }
        );
        this.isPause$ = this.service.getLessonStep().pipe(
            map(value => value?.restartBtn ?? false)
        );

        this.service.init();
    }

    ngOnDestroy(): void {
        this.service.unsubsccribe();
        this.comparisonResultSub.unsubscribe();
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
                if (this.isReadyToCheck) {
                    console.log('check');
                    this.check();
                } else if (this.isCorrect) {
                    console.log('correct');
                    this.correct();
                } else if (this.isWrong) {
                    console.log('wrong');
                    this.wrong();
                }
                break;
        }
    }

    startLesson(): void {
        this.service.startLesson();
    }

    check(): void {
        this.service.check(this.value);
    }

    correct(): void {
        if (this.isWrong) {
            this.service.accept();
        } else {
            this.service.correct();
        }
    }

    wrong(): void {
        this.service.wrong();
    }

    finishLesson(): void {
        this.service.finishLesson();
    }

    pause(): void {
        this.service.pause();
    }

    restart(): void {
        this.service.restart();
    }
}
