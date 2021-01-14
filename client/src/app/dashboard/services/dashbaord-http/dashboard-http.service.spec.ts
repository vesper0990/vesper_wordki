import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ExtendedCardDetailsDto } from 'src/app/share/models/dtos/extended-card-details-dto';
import { SideDetailsDto } from 'src/app/share/models/dtos/side-details-dto';
import { Never } from 'src/app/share/utils/date-util';
import { environment } from 'src/environments/environment';
import { DashboardHttpService } from './dashboard-http.service';
import { DashboardHttpServiceBase } from './dashboard-http.service.base';

describe('DashboardHttpService', () => {

    let service: DashboardHttpServiceBase;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                { provide: DashboardHttpServiceBase, useClass: DashboardHttpService }
            ]
        }).compileComponents();
        service = TestBed.inject(DashboardHttpServiceBase);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should create', () => {
        expect(service).toBeTruthy();
    });

    it('should getLastWords', () => {
        const card = createExtendedCardDetailsDto();

        service.getLastWords(1).subscribe(value => {
            expect(value.id).toBe(1);
        });

        const req = httpMock.expectOne(`${environment.apiUrl}/card/lastAdded/1`);
        expect(req.request.method).toBe('GET');
        req.flush([card]);
    });

    it('should getLastFailed', () => {
        const card = createExtendedCardDetailsDto();

        service.getLastFailed().subscribe(value => {
            expect(value.id).toBe(1);
        });

        const req = httpMock.expectOne(`${environment.apiUrl}/card/lastFailed`);
        expect(req.request.method).toBe('GET');
        req.flush(card);
    });

    it('should getLastLesson if lesson exists', () => {
        const date = '2020/01/15';

        service.getLastLesson().subscribe(value => {
            expect(value).toEqual(new Date(2020, 0, 15));
        });

        const req = httpMock.expectOne(`${environment.apiUrl}/lesson/lastLessonDate`);
        expect(req.request.method).toBe('GET');
        req.flush({ isAnyLesson: true, date: date });
    });

    it('should getLastLesson if lesson does not exist', () => {
        service.getLastLesson().subscribe(value => {
            expect(value).toEqual(Never);
        });

        const req = httpMock.expectOne(`${environment.apiUrl}/lesson/lastLessonDate`);
        expect(req.request.method).toBe('GET');
        req.flush({ isAnyLesson: false, date: null });
    });

    it('should getNextRepeatWord', () => {
        const card = createExtendedCardDetailsDto();

        service.getNextRepeatWord().subscribe(value => {
            expect(value.id).toEqual(card.id);
        });

        const req = httpMock.expectOne(`${environment.apiUrl}/card/nextRepeat`);
        expect(req.request.method).toBe('GET');
        req.flush(card);
    });

    it('should getGroupsCount', () => {
        const groupsCount = 2;

        service.getGroupsCount().subscribe(value => {
            expect(value).toEqual(groupsCount);
        });

        const req = httpMock.expectOne(`${environment.apiUrl}/group/count`);
        expect(req.request.method).toBe('GET');
        req.flush(groupsCount);
    });

    it('should getWordsCount', () => {
        const wordsCount = 2;

        service.getWordsCount().subscribe(value => {
            expect(value).toEqual(wordsCount);
        });

        const req = httpMock.expectOne(`${environment.apiUrl}/card/count`);
        expect(req.request.method).toBe('GET');
        req.flush(wordsCount);
    });


    it('should getTodayRepeatCount', () => {
        const repeatCount = 2;

        service.getTodayRepeatCount().subscribe(value => {
            expect(value).toEqual(repeatCount);
        });

        const req = httpMock.expectOne(`${environment.apiUrl}/lesson/todaysCardCount`);
        expect(req.request.method).toBe('GET');
        req.flush(repeatCount);
    });

});

function createExtendedCardDetailsDto(): ExtendedCardDetailsDto {
    return {
        id: 1,
        groupName: 'test-name',
        creationDate: '2020-01-15',
        back: { value: 'test-value', drawer: 1, isVisible: true, language: 1 } as SideDetailsDto,
        front: { value: 'test-value', drawer: 1, isVisible: true, language: 1 } as SideDetailsDto
    } as ExtendedCardDetailsDto;
}
