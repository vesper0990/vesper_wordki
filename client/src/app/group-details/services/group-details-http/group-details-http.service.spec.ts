import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { EditWord } from 'src/app/share/components/edit-word-dialog/edit-word.model';
import { CardDetailsDto } from 'src/app/share/models/dtos/card-details-dto';
import { GroupDetailsDto } from 'src/app/share/models/dtos/group-details-dto';
import { SideDetailsDto } from 'src/app/share/models/dtos/side-details-dto';
import { environment } from 'src/environments/environment';
import { GroupDetailsHttp } from './group-details-http.service';
import { GroupDetailsHttpBase } from './group-details-http.service.base';

describe('DashboardHttpService', () => {

    let service: GroupDetailsHttpBase;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                { provide: GroupDetailsHttpBase, useClass: GroupDetailsHttp }
            ]
        }).compileComponents();
        service = TestBed.inject(GroupDetailsHttpBase);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should create', () => {
        expect(service).toBeTruthy();
    });

    it('should getLastWords', () => {
        const groupDetails = { id: 1, name: 'test-name', languageFront: 1, languageBack: 2 } as GroupDetailsDto;

        service.getGroupDetails(1).subscribe(value => {
            expect(value.id).toBe(1);
        });

        const req = httpMock.expectOne(`${environment.apiUrl}/group/details/1`);
        expect(req.request.method).toBe('GET');
        req.flush(groupDetails);
    });

    it('should getWords', () => {
        const cards = [{ id: 1, back: {} as SideDetailsDto, front: {} as SideDetailsDto } as CardDetailsDto,
        { id: 2, back: {} as SideDetailsDto, front: {} as SideDetailsDto } as CardDetailsDto];

        service.getWords(1).subscribe(value => {
            expect(value.length).toBe(2);
        });

        const req = httpMock.expectOne(`${environment.apiUrl}/card/all/1`);
        expect(req.request.method).toBe('GET');
        req.flush(cards);
    });

    it('should updateWord', () => {
        service.updateWord({} as EditWord).subscribe();

        const req = httpMock.expectOne(`${environment.apiUrl}/card/update`);
        expect(req.request.method).toBe('PUT');
        req.flush({});
    });

    it('should addWord', () => {
        service.addWord({} as EditWord).subscribe();

        const req = httpMock.expectOne(`${environment.apiUrl}/card/add`);
        expect(req.request.method).toBe('POST');
        req.flush({});
    });

    it('should removeWord', () => {
        service.removeWord(1, 2).subscribe();

        const req = httpMock.expectOne(`${environment.apiUrl}/card/delete/2`);
        expect(req.request.method).toBe('DELETE');
        req.flush({});
    });

});
