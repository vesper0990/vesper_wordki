import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { LessonStateEnum, LessonStep } from 'src/app/lesson/models/lesson-state';
import { TimerService } from 'src/app/lesson/services/stoper/stoper2.service';
import { FinishLesson, PauseLesson, RestartLesson, StartLesson } from 'src/app/lesson/store/actions';
import { selectLessonStep } from 'src/app/lesson/store/selectors';
import { createProvider } from 'src/app/test/helpers.spec';
import { StoperService } from './stoper.service';

describe('StoperService', () => {

    let router: Router;
    let service: StoperService;
    let store: MockStore;
    let timerService: jasmine.SpyObj<TimerService>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule
            ],
            providers: [
                StoperService,
                provideMockStore(),
                createProvider(TimerService)
            ]
        }).compileComponents();

        router = TestBed.inject(Router);
        service = TestBed.inject(StoperService);
        store = TestBed.inject(MockStore);
        timerService = TestBed.inject(TimerService) as jasmine.SpyObj<TimerService>;
    });

    it('should create', () => {
        expect(service).toBeTruthy();
    });

    it('should init', () => {
        service.init();

        expect(timerService.init).toHaveBeenCalledTimes(1);
    });

    it('should finalize', () => {
        service.finalize();

        expect(timerService.stop).toHaveBeenCalledTimes(1);
    });

    it('should getLessonStep', () => {
        const step = LessonStep.getLessonStep(LessonStateEnum.QUESTION);
        store.overrideSelector(selectLessonStep, step);

        service.getLessonStep().subscribe(value => expect(value).toBe(step));
    });

    it('should getTime', () => {
        const time$ = 10;
        timerService.time.and.returnValue(of(time$));

        service.getTime().subscribe(value => expect(value).toBe(time$));
    });

    it('should start', () => {
        spyOn(store, 'dispatch');
        service.start();

        expect(timerService.restart).toHaveBeenCalledTimes(1);
        expect(store.dispatch).toHaveBeenCalledWith(jasmine.any(StartLesson));
    });

    it('should pause', () => {
        spyOn(store, 'dispatch');
        service.pause();

        expect(timerService.stop).toHaveBeenCalledTimes(1);
        expect(store.dispatch).toHaveBeenCalledWith(jasmine.any(PauseLesson));
    });

    it('should resume', () => {
        spyOn(store, 'dispatch');
        service.resume();

        expect(timerService.resume).toHaveBeenCalledTimes(1);
        expect(store.dispatch).toHaveBeenCalledWith(jasmine.any(RestartLesson));
    });

    it('should finish', () => {
        const spy = spyOn(router, 'navigate');
        spyOn(store, 'dispatch');
        service.finish();

        expect(timerService.stop).toHaveBeenCalledTimes(1);
        expect(store.dispatch).toHaveBeenCalledWith(jasmine.any(FinishLesson));
        expect(spy.calls.first().args[0]).toContain('/lesson/summary');
    });

});
