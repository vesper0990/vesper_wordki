import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { LessonCardDto, SideDto } from '../../models/word-repeat.dto';
import { LessonHttpService } from './lesson-http.service';
import { LessonHttpBaseService } from './lesson-http.service.base';

describe('LessonHttpService', () => {

    let service: LessonHttpBaseService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                { provide: LessonHttpBaseService, useClass: LessonHttpService }
            ]
        }).compileComponents();
        service = TestBed.inject(LessonHttpBaseService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should create', () => {
        expect(service).toBeTruthy();
    });

    it('should correct', () => {
        service.correct(1, 1, '').subscribe();

        const req = httpMock.expectOne(`${environment.apiUrl}/lesson/answer`);
        expect(req.request.method).toBe('POST');
        req.flush({});
    });

    it('should wrong', () => {
        service.wrong(1, 1, '').subscribe();

        const req = httpMock.expectOne(`${environment.apiUrl}/lesson/answer`);
        expect(req.request.method).toBe('POST');
        req.flush({});
    });

    it('should accept', () => {
        service.accept(1, 1, '').subscribe();

        const req = httpMock.expectOne(`${environment.apiUrl}/lesson/answer`);
        expect(req.request.method).toBe('POST');
        req.flush({});
    });

    it('should accept', () => {
        service.createLesson().subscribe();

        const req = httpMock.expectOne(`${environment.apiUrl}/lesson/start`);
        expect(req.request.method).toBe('POST');
        req.flush({});
    });

    it('should finish', () => {
        service.finish(1, 1).subscribe();

        const req = httpMock.expectOne(`${environment.apiUrl}/lesson/finish`);
        expect(req.request.method).toBe('PUT');
        req.flush({});
    });

    it('should getTodayCards', () => {
        const cards = [createLessonCardDto(), createLessonCardDto()];

        service.getTodayWords().subscribe(value => {
            expect(value.length).toBe(2);
        });

        const req = httpMock.expectOne(`${environment.apiUrl}/card/allRepeats`);
        expect(req.request.method).toBe('GET');
        req.flush(cards);
    });

});

function createLessonCardDto(): LessonCardDto {
    return {
        id: 1,
        groupName: 'test-group',
        question: { drawer: 1, value: 'value', example: 'example', language: 1 } as SideDto,
        answer: { drawer: 1, value: 'value', example: 'example', language: 1 } as SideDto
    } as LessonCardDto;
}
