import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GroupsComponent } from './groups.component';
import { MockComponent } from 'ng-mocks';
import { GroupRowComponent } from './components/group-row/group-row.component';
import { ProgressHorizontalComponent } from '../share/components/progress-horizontal/progress-horizontal.component';
import { EditGroupDialogComponent } from '../share/components/edit-group-dialog/edit-group-dialog.component';
import { GroupsListService } from './services/groups-list/groups-list.service';
import { of } from 'rxjs';
import { EditGroup } from '../share/components/edit-group-dialog/edit-group.model';
import { selectAllDebugElements, selectDebugElement } from '../test/utils';
import { Group } from './models/group.model';

describe('GroupsComponent', () => {
  let component: GroupsComponent;
  let fixture: ComponentFixture<GroupsComponent>;
  let service: jasmine.SpyObj<GroupsListService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        GroupsComponent,
        MockComponent(GroupRowComponent),
        MockComponent(ProgressHorizontalComponent),
        MockComponent(EditGroupDialogComponent)],
      providers: [
        {
          provide: GroupsListService,
          useValue: jasmine.createSpyObj(['dialogRemove', 'dialogCancel', 'dialogSave', 'openDialogToEdit', 'getDialogMode',
            'openDialogToAdd', 'getDialogGroup', 'isDialogVisible', 'isLoading', 'getList', 'openGroup', 'loadGroups'])
        }
      ]
    })
      .compileComponents();
  });

  describe('before loaded', () => {
    beforeEach(() => {
      service = TestBed.inject(GroupsListService) as jasmine.SpyObj<GroupsListService>;
      service.getDialogMode.and.returnValue(of('add'));
      service.getDialogGroup.and.returnValue(of({} as EditGroup));
      service.isDialogVisible.and.returnValue(of(false));
      service.getList.and.returnValue(of([]));
      service.isLoading.and.returnValue(of(true));

      fixture = TestBed.createComponent(GroupsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should display progressbar', () => {
      const progressBar = selectDebugElement(fixture, 'app-progress-horizontal');
      expect(progressBar).toBeTruthy();
    });
  });

  describe('after loaded', () => {
    beforeEach(() => {
      service = TestBed.inject(GroupsListService) as jasmine.SpyObj<GroupsListService>;
      service.getDialogMode.and.returnValue(of('add'));
      service.getDialogGroup.and.returnValue(of({} as EditGroup));
      service.isDialogVisible.and.returnValue(of(false));
      service.getList.and.returnValue(of([]));
      service.isLoading.and.returnValue(of(false));

      fixture = TestBed.createComponent(GroupsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });



    describe('with any groups', () => {
      beforeEach(() => {
        service = TestBed.inject(GroupsListService) as jasmine.SpyObj<GroupsListService>;
        service.getDialogMode.and.returnValue(of('add'));
        service.getDialogGroup.and.returnValue(of({} as EditGroup));
        service.isDialogVisible.and.returnValue(of(false));
        service.getList.and.returnValue(of([]));
        service.isLoading.and.returnValue(of(false));

        fixture = TestBed.createComponent(GroupsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });

      it('should create', () => {
        expect(component).toBeTruthy();
      });

      it('should hide progressbar', () => {
        const progressBar = selectDebugElement(fixture, 'app-progress-horizontal');
        expect(progressBar).toBeNull();
      });

      it('should display info no groups', () => {
        expect(fixture.nativeElement.innerHTML).toContain('You do not have any groups yet.');
      });

      it('should display button to add group', () => {
        const addGroupButton = selectDebugElement(fixture, 'button');
        expect(addGroupButton).toBeTruthy();

        addGroupButton.nativeElement.click();
        expect(service.openDialogToAdd).toHaveBeenCalledTimes(1);
      });
    });



    describe('with groups', () => {
      beforeEach(() => {
        service = TestBed.inject(GroupsListService) as jasmine.SpyObj<GroupsListService>;
        service.getDialogMode.and.returnValue(of('add'));
        service.getDialogGroup.and.returnValue(of({} as EditGroup));
        service.isDialogVisible.and.returnValue(of(false));
        service.getList.and.returnValue(of([{ name: 'test' } as Group]));
        service.isLoading.and.returnValue(of(false));

        fixture = TestBed.createComponent(GroupsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });

      it('should create', () => {
        expect(component).toBeTruthy();
      });

      it('should hide progressbar', () => {
        const progressBar = selectDebugElement(fixture, 'app-progress-horizontal');
        expect(progressBar).toBeNull();
      });

      it('should display button to add group', () => {
        const addGroupButton = selectDebugElement(fixture, 'button');
        expect(addGroupButton).toBeTruthy();

        addGroupButton.nativeElement.click();
        expect(service.openDialogToAdd).toHaveBeenCalledTimes(1);
      });

      it('should display groups', () => {
        const groupsRow = selectAllDebugElements(fixture, 'app-group-row');

        expect(groupsRow.length).toBe(1);
      });

      it('should edit group', () => {
        const expectedValue = { name: 'test' } as Group;
        const groupRow = selectDebugElement(fixture, 'app-group-row');

        groupRow.componentInstance.edit.emit(expectedValue);
        expect(service.openDialogToEdit).toHaveBeenCalledWith(expectedValue);
      });
    });
  });
});
