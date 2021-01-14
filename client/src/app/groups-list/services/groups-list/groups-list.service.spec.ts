import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { GroupsListService } from './groups-list.service';
import * as actions from '../../store/actions';
import * as selectors from '../../store/selectors';
import { EditGroup } from 'src/app/share/components/edit-group-dialog/edit-group.model';
import { LanguageType, LanguageTypeEnum } from 'src/app/share/models/language-type.mode';
import { Group } from 'src/app/share/models/card-details';

describe('GroupsListService', () => {

    let service: GroupsListService;
    let store: MockStore;
    let router: Router;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
            ],
            providers: [
                GroupsListService,
                provideMockStore(),
            ]
        }).compileComponents();
        service = TestBed.inject(GroupsListService);
        store = TestBed.inject(MockStore);
        router = TestBed.inject(Router);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should loadGroup', () => {
        spyOn(store, 'dispatch').and.callThrough();

        service.loadGroups();

        expect(store.dispatch).toHaveBeenCalledWith(new actions.GetGroups());
    });

    it('should openDialogToAdd', () => {
        spyOn(store, 'dispatch').and.callThrough();

        service.openDialogToAdd();

        expect(store.dispatch).toHaveBeenCalledWith(new actions.ShowDialog({ mode: 'add' }));
    });

    it('should openDialogToAdd', () => {
        spyOn(store, 'dispatch').and.callThrough();
        const group = {} as Group;

        service.openDialogToEdit(group);

        expect(store.dispatch).toHaveBeenCalledWith(new actions.ShowDialog({ mode: 'edit', group: group }));
    });

    it('should save editing group', () => {
        spyOn(store, 'dispatch').and.callThrough();
        const editGroup = { id: 1 } as EditGroup;

        service.dialogSave(editGroup);

        expect(store.dispatch).toHaveBeenCalledWith(new actions.UpdateGroup({ group: editGroup }));
    });

    it('should save new group', () => {
        spyOn(store, 'dispatch').and.callThrough();
        const editGroup = { id: 0 } as EditGroup;

        service.dialogSave(editGroup);

        expect(store.dispatch).toHaveBeenCalledWith(new actions.AddGroup({ group: editGroup }));
    });

    it('should save new group', () => {
        spyOn(store, 'dispatch').and.callThrough();
        const groupId = 1;

        service.dialogRemove(groupId);

        expect(store.dispatch).toHaveBeenCalledWith(new actions.RemoveGroup({ groupId: groupId }));
    });

    it('should save new group', () => {
        spyOn(store, 'dispatch').and.callThrough();

        service.dialogCancel();

        expect(store.dispatch).toHaveBeenCalledWith(new actions.HideDialog());
    });

    it('should return dialog visibility from store', () => {
        const expectedValue = true;
        store.overrideSelector(selectors.selectDialogVisibility, expectedValue);
        store.refreshState();

        service.isDialogVisible().subscribe(value => expect(value).toBe(expectedValue)).unsubscribe();
    });

    it('should return dialog mode from store', () => {
        const expectedValue = 'add';
        store.overrideSelector(selectors.selectDialogMode, expectedValue);
        store.refreshState();

        service.getDialogMode().subscribe(value => expect(value).toBe(expectedValue)).unsubscribe();
    });

    it('should return dialog group from store', () => {
        const expectedValue = createTestGroup();
        store.overrideSelector(selectors.selectDialogGroup, expectedValue);
        store.refreshState();

        service.getDialogGroup().subscribe(value => expect(value).toEqual(
            new EditGroup(expectedValue.id, expectedValue.name, expectedValue.languageFront, expectedValue.languageBack)
        )).unsubscribe();
    });

    it('should return dialog group from store as new', () => {
        store.overrideSelector(selectors.selectDialogGroup, null);
        store.refreshState();

        service.getDialogGroup().subscribe(value => expect(value).toEqual(
            new EditGroup(0, '',
                LanguageType.getLanguageType(LanguageTypeEnum.Undefined), LanguageType.getLanguageType(LanguageTypeEnum.Undefined))
        )).unsubscribe();
    });


    it('should return isloading from store', () => {
        const expectedValue = true;
        store.overrideSelector(selectors.getIsLoading, expectedValue);
        store.refreshState();

        service.isLoading().subscribe(value => expect(value).toBe(expectedValue)).unsubscribe();
    });

    it('should return group list from store', () => {
        const expectedValue = [createTestGroup(), createTestGroup()];
        store.overrideSelector(selectors.getGroupsList, expectedValue);
        store.refreshState();

        service.getList().subscribe(value => expect(value).toEqual(expectedValue)).unsubscribe();
    });

    it('should navigate to creator', () => {
        const spy = spyOn(router, 'navigate').and.stub();

        service.addGroupFromFile();

        expect(spy.calls.first().args[0]).toContain('creator');
    });

    it('should navigate to details', () => {
        const spy = spyOn(router, 'navigate').and.stub();

        service.showDetails(1);
        expect(spy.calls.first().args[0]).toContain('/details');
        expect(spy.calls.first().args[0]).toContain(1);
    });
});

function createTestGroup(): Group {
    return new Group(1,
        'test',
        LanguageType.getLanguageType(LanguageTypeEnum.English),
        LanguageType.getLanguageType(LanguageTypeEnum.English),
        1,
        2);
}
