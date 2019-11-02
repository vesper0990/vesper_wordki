import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Word } from '@app/common/models/Word';
import { LessonBaseService } from '../services/base.service';
import { LessonSettingsService } from '../../common/services/lesson-settings.service';
import { WordResolver } from '../services/word-resolver.service';
import { MockHelper } from '@app/common/services/data/_mock-helper';

export abstract class LessonBase implements OnInit {

    needToStart: boolean;
    needToCheck: boolean;
    needToAnsware: boolean;
    correctCounter: number;
    wrongCounter: number;
    answerCounter: number;
    remainingWords: number;
    allWords: number;
    question = '';
    questionExample = '';
    answare = '';
    answareExample = '';
    protected lessonState: LESSON_STATE;
    updatedWord: Word;

    constructor(protected lessonService: LessonBaseService,
        protected lessonSettingsService: LessonSettingsService,
        protected router: Router) {
    }

    ngOnInit(): void {
        this.lessonService.lessonSettings = this.lessonSettingsService.settings;
        // this.lessonService.lessonSettings.group = MockHelper.database.groups[2];
        if (this.lessonService.lessonSettings.group == null) {
            this.router.navigate(['/wordki/database/groups']);
            return;
        }
        this.lessonService.initilize();
        this.setState(LESSON_STATE.NEED_TO_START);
        this.allWords = this.lessonService.wordsQueue.length;
        this.remainingWords = this.lessonService.wordsQueue.length;
    }

    public abstract onEnterClick(): void;

    startLesson() {
        this.lessonService.startLesson();
        if (this.lessonService.currentWord === null) {
            console.log('Some errors appear');
            return;
        }
        this.setState(LESSON_STATE.NEED_TO_CHECK);
    }

    check() {
        this.lessonService.check(this.answare);
        this.setState(LESSON_STATE.NEED_TO_ANSWARE);
    }

    know() {
        this.lessonService.know();
        this.setState(LESSON_STATE.NEED_TO_CHECK);
    }

    unknow() {
        this.lessonService.unknow();
        this.setState(LESSON_STATE.NEED_TO_CHECK);
    }

    public onUpdateSuccess(event: any): void {
        // this.alertify.success('Zapisano pomyslnie!');
    }
    public onUpdateFailed(error: any): void {
        // this.alertify.error('Blad w trakcie zapisu!');
    }

    public updateWord(): void {
        this.updatedWord = this.lessonService.currentWord;
    }

    public pause(): void {
        this.lessonService.pauseLesson();
    }

    public resume(): void {
        this.lessonService.resumeLesson();
    }

    private setLabels(): void {
        switch (this.lessonState) {
            case LESSON_STATE.NEED_TO_START: {
                this.question = '';
                this.questionExample = '';
                this.answare = '';
                this.answareExample = '';
                break;
            }
            case LESSON_STATE.NEED_TO_CHECK: {
                this.question =
                    WordResolver.getQuestion(
                        this.lessonService.currentWord,
                        this.lessonService.lessonSettings.translationDirectionEnum
                    );
                this.questionExample =
                    WordResolver.getQuestionExample(
                        this.lessonService.currentWord,
                        this.lessonService.lessonSettings.translationDirectionEnum
                    );
                this.answare = '';
                this.answareExample = '';
                break;
            }
            case LESSON_STATE.NEED_TO_ANSWARE: {
                if (this.lessonService.isCorrect) {
                    this.answare =
                        WordResolver.getAnsware(
                            this.lessonService.currentWord,
                            this.lessonService.lessonSettings.translationDirectionEnum
                        );
                } else {
                    this.answare += '/' +
                        WordResolver.getAnsware(
                            this.lessonService.currentWord,
                            this.lessonService.lessonSettings.translationDirectionEnum
                        );
                }
                this.answareExample =
                    WordResolver.getAnswareExample(
                        this.lessonService.currentWord,
                        this.lessonService.lessonSettings.translationDirectionEnum
                    );
                break;
            }
        }
        this.correctCounter = this.lessonService.lessonResultService.result.correct;
        this.wrongCounter = this.lessonService.lessonResultService.result.wrong;
        this.answerCounter = this.lessonService.counter;
        this.remainingWords = this.lessonService.wordsQueue.length + 1;
    }

    private setButtons(): void {
        switch (this.lessonState) {
            case LESSON_STATE.NEED_TO_START: {
                this.needToStart = true;
                this.needToCheck = false;
                this.needToAnsware = false;
                break;
            }
            case LESSON_STATE.NEED_TO_CHECK: {
                this.needToStart = false;
                this.needToCheck = true;
                this.needToAnsware = false;
                break;
            }
            case LESSON_STATE.NEED_TO_ANSWARE: {
                this.needToStart = false;
                this.needToCheck = false;
                this.needToAnsware = true;
                break;
            }
        }
    }

    protected setState(state: LESSON_STATE): void {
        if (this.lessonState === state) {
            return;
        }
        if (this.lessonService.currentWord === null) {
            this.router.navigate(['/wordki/lesson/results']);
            return;
        }
        this.lessonState = state;
        this.setLabels();
        this.setButtons();
    }
}


export enum LESSON_STATE {
    NEED_TO_START,
    NEED_TO_CHECK,
    NEED_TO_ANSWARE,
}
