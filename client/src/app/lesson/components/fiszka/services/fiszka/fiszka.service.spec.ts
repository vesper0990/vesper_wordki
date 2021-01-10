import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { LessonStep } from 'src/app/lesson/models/lesson-state';
import { TimerService } from 'src/app/lesson/services/stoper/stoper2.service';
import {
    AnswerCorrect, AnswerWrong,
    CheckCard, CreateNewLesson,
    FinishLesson, GetWords,
    PauseLesson, RestartLesson,
    StartLesson, UpdateCardCorrect,
    UpdateCardWrong
} from 'src/app/lesson/store/actions';
import { selectCurrentCard, selectLessonStep, } from 'src/app/lesson/store/selectors';
import { CardRepeat } from 'src/app/share/models/card-details';
import { createProvider } from 'src/app/test/helpers.spec';
import { FiszkaService } from './fiszka.service';

describe('FiszkaService', () => {

    let service: FiszkaService;
    let store: MockStore;
    let router: Router;
    let timer: jasmine.SpyObj<TimerService>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule
            ],
            providers: [
                FiszkaService,
                createProvider(TimerService),
                provideMockStore()
            ]
        }).compileComponents();

        service = TestBed.inject(FiszkaService);
        router = TestBed.inject(Router);
        store = TestBed.inject(MockStore);
        timer = TestBed.inject(TimerService) as jasmine.SpyObj<TimerService>;
    });

    it('should create', () => {
        expect(service).toBeTruthy();
    });

    it('should return currectCard', () => {
        const card = { id: 1 } as CardRepeat;
        store.overrideSelector(selectCurrentCard, card);
        service.getCurrentCard().subscribe(value => expect(value).toBe(card));
    });

    it('should return lessonStep', () => {
        const step = LessonStep.ANSWER;
        store.overrideSelector(selectLessonStep, step);
        service.getLessonStep().subscribe(value => expect(value).toBe(step));
    });

    it('should restart', () => {
        spyOn(store, 'dispatch');

        service.restart();

        expect(timer.restart).toHaveBeenCalled();
        expect(store.dispatch).toHaveBeenCalledWith(jasmine.any(RestartLesson));
    });

    it('should pause', () => {
        spyOn(store, 'dispatch');

        service.pause();

        expect(timer.stop).toHaveBeenCalled();
        expect(store.dispatch).toHaveBeenCalledWith(jasmine.any(PauseLesson));
    });

    it('should startLesson', () => {
        spyOn(store, 'dispatch');

        service.startLesson();

        expect(timer.restart).toHaveBeenCalled();
        expect(store.dispatch).toHaveBeenCalledWith(jasmine.any(StartLesson));
    });

    it('should loadWords', () => {
        spyOn(store, 'dispatch');

        service.loadWords();

        expect(store.dispatch).toHaveBeenCalledWith(jasmine.any(CreateNewLesson));
        expect(store.dispatch).toHaveBeenCalledWith(jasmine.any(GetWords));
    });

    it('should finishLesson', () => {
        spyOn(store, 'dispatch');
        const spy = spyOn(router, 'navigate');

        service.finishLesson();

        expect(store.dispatch).toHaveBeenCalledWith(jasmine.any(FinishLesson));
        expect(spy.calls.first().args[0]).toContain('/lesson/summary');
    });

    it('should correct', () => {
        const step = LessonStep.ANSWER;
        store.overrideSelector(selectLessonStep, step);
        spyOn(store, 'dispatch');
        service.init();

        service.correct();

        expect(store.dispatch).toHaveBeenCalledWith(jasmine.any(UpdateCardCorrect));
        expect(store.dispatch).toHaveBeenCalledWith(jasmine.any(AnswerCorrect));
        service.unsubsccribe();
    });

    it('should not correct', () => {
        const step = LessonStep.QUESTION;
        store.overrideSelector(selectLessonStep, step);
        spyOn(store, 'dispatch');
        service.init();

        service.correct();

        expect(store.dispatch).toHaveBeenCalledTimes(0);
        service.unsubsccribe();
    });

    it('should wrong', () => {
        const step = LessonStep.ANSWER;
        store.overrideSelector(selectLessonStep, step);
        spyOn(store, 'dispatch');
        service.init();

        service.wrong();

        expect(store.dispatch).toHaveBeenCalledWith(jasmine.any(UpdateCardWrong));
        expect(store.dispatch).toHaveBeenCalledWith(jasmine.any(AnswerWrong));
        service.unsubsccribe();
    });

    it('should not wrong', () => {
        const step = LessonStep.QUESTION;
        store.overrideSelector(selectLessonStep, step);
        spyOn(store, 'dispatch');
        service.init();

        service.wrong();

        expect(store.dispatch).toHaveBeenCalledTimes(0);
        service.unsubsccribe();
    });

    it('should check', () => {
        const step = LessonStep.QUESTION;
        store.overrideSelector(selectLessonStep, step);
        spyOn(store, 'dispatch');
        service.init();

        service.check();

        expect(store.dispatch).toHaveBeenCalledWith(jasmine.any(CheckCard));
        service.unsubsccribe();
    });

    it('should not check', () => {
        const step = LessonStep.ANSWER;
        store.overrideSelector(selectLessonStep, step);
        spyOn(store, 'dispatch');
        service.init();

        service.check();

        expect(store.dispatch).toHaveBeenCalledTimes(0);
        service.unsubsccribe();
    });
});
