import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { LessonResult } from 'src/app/lesson/models/lesson-result';
import { selectLessonResult } from 'src/app/lesson/store/selectors';
import { SummaryService } from './summary.service';

describe('SummaryService', () => {

    let service: SummaryService;
    let store: MockStore;
    let router: Router;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule
            ],
            providers: [
                SummaryService,
                provideMockStore()
            ]
        }).compileComponents();

        service = TestBed.inject(SummaryService);
        store = TestBed.inject(MockStore);
        router = TestBed.inject(Router);
    });

    it('should create', () => {
        expect(service).toBeTruthy();
    });

    it('should getResult', () => {
        const result = new LessonResult();
        store.overrideSelector(selectLessonResult, result);

        service.getResults().subscribe(value => expect(value).toBe(result));
    });

    it('should finish', () => {
        const spy = spyOn(router, 'navigate');

        service.finish();

        expect(spy.calls.first().args[0]).toContain('/dashboard');
    });
});
