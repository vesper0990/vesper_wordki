import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GroupsComponent } from './groups.component';
import { MockComponent } from 'ng-mocks';
import { GroupRowComponent } from './components/group-row/group-row.component';
import { ProgressHorizontalComponent } from '../share/components/progress-horizontal/progress-horizontal.component';
import { EditGroupDialogComponent } from '../share/components/edit-group-dialog/edit-group-dialog.component';
import { GroupsListService } from './services/groups-list/groups-list.service';
import { of } from 'rxjs';
import { EditGroup } from '../share/components/edit-group-dialog/edit-group.model';
import { selectAllDebugElements, selectDebugElement, selectDebugElementById } from '../test/utils.spec';
import { Group } from '../share/models/card-details';
import { createProvider } from '../test/helpers.spec';

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
        createProvider(GroupsListService)
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

    it('should call onEditSave', () => {
      const group = { id: 1 } as EditGroup;
      component.onEditSave(group);
      expect(service.dialogSave).toHaveBeenCalledWith(group);
    });

    it('should call onEditCancel', () => {
      component.onEditCancel();
      expect(service.dialogCancel).toHaveBeenCalled();
    });

    it('should call onEditRemove', () => {
      const id = 1;
      component.onEditRemove(id);
      expect(service.dialogRemove).toHaveBeenCalledWith(id);
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

      it('should display button to add group from file', () => {
        const addGroupButton = selectDebugElementById(fixture, 'add-group-file-btn');
        expect(addGroupButton).toBeTruthy();

        addGroupButton.nativeElement.click();
        expect(service.addGroupFromFile).toHaveBeenCalledTimes(1);
      });
    });



    describe('with groups', () => {
      beforeEach(() => {
        service = TestBed.inject(GroupsListService) as jasmine.SpyObj<GroupsListService>;
        service.getDialogMode.and.returnValue(of('add'));
        service.getDialogGroup.and.returnValue(of({} as EditGroup));
        service.isDialogVisible.and.returnValue(of(false));
        service.getList.and.returnValue(of([{ id: 1, name: 'test' } as Group]));
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

      it('should show details', () => {
        const groupRow = selectDebugElement(fixture, 'app-group-row');
        groupRow.nativeElement.click();

        expect(service.showDetails).toHaveBeenCalledWith(1);
      });
    });
  });
});
