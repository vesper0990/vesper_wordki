import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { EditGroup } from 'src/app/share/components/edit-group-dialog/edit-group.model';
import { GroupDto } from 'src/app/share/models/dtos/group-dto';
import { environment } from 'src/environments/environment';
import { GroupsListHttpService } from './groups-list-http.service';
import { GroupsListHttpServiceBase } from './groups-list-http.service.base';

describe('GroupsListHttpService', () => {

    let service: GroupsListHttpServiceBase;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                { provide: GroupsListHttpServiceBase, useClass: GroupsListHttpService }
            ]
        }).compileComponents();
        service = TestBed.inject(GroupsListHttpServiceBase);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should create', () => {
        expect(service).toBeTruthy();
    });

    it('should addGroup', () => {
        const editGroup = { languageBack: { type: 1 }, languageFront: { type: 1 } } as EditGroup;

        service.addGroup(editGroup).subscribe(value => {
            expect(value).toBe(1);
        });

        const req = httpMock.expectOne(`${environment.apiUrl}/group/add`);
        expect(req.request.method).toBe('POST');
        req.flush(1);
    });

    it('should updateGroup', () => {
        const editGroup = { languageBack: { type: 1 }, languageFront: { type: 1 } } as EditGroup;

        service.updateGroup(editGroup).subscribe();

        const req = httpMock.expectOne(`${environment.apiUrl}/group/update`);
        expect(req.request.method).toBe('PUT');
        req.flush({});
    });

    it('should removeGroup', () => {
        service.removeGroup(1).subscribe();

        const req = httpMock.expectOne(`${environment.apiUrl}/group/delete/1`);
        expect(req.request.method).toBe('DELETE');
        req.flush({});
    });

    it('should getGroups', () => {
        const groups = [createGroupDto(), createGroupDto()];
        service.getGroups().subscribe(value => {
            expect(value.length).toBe(2);
        });

        const req = httpMock.expectOne(`${environment.apiUrl}/group/all`);
        expect(req.request.method).toBe('GET');
        req.flush(groups);
    });

});


function createGroupDto(): GroupDto {
    return {
        id: 1,
        cardsCount: 1,
        languageBack: 1,
        languageFront: 2,
        name: 'name-group',
        repeatsCount: 1
    } as GroupDto;
}
