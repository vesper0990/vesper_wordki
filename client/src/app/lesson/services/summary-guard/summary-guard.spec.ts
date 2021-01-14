import { TestBed } from '@angular/core/testing';
import { Router, UrlTree } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { selectLessonResult } from '../../store/selectors';
import { SummaryGuardService } from './summage-guard';

describe('SummaryGuard', () => {

    let store: MockStore;
    let service: SummaryGuardService;
    let router: Router;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            providers: [
                provideMockStore(),
                SummaryGuardService
            ]
        });

        service = TestBed.inject(SummaryGuardService);
        store = TestBed.inject(MockStore);
        router = TestBed.inject(Router);
    });

    it('should create', () => {
        expect(service).toBeTruthy();
    });

    it('should allow', () => {
        spyOn(router, 'parseUrl');
        store.overrideSelector(selectLessonResult, {} as any);
        service.canActivate({} as any, {} as any).subscribe(value => {
            expect(value).toBeTrue();
            expect(router.parseUrl).toHaveBeenCalledTimes(0);
        });
    });

    it('should redirect from', () => {
        spyOn(router, 'parseUrl');
        store.overrideSelector(selectLessonResult, null);
        service.canActivate({} as any, {} as any).subscribe((value: UrlTree) => {
            expect(router.parseUrl).toHaveBeenCalledTimes(1);
        });
    });
});
