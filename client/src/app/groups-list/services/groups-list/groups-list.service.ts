import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EditGroup } from 'src/app/share/components/edit-group-dialog/edit-group.model';
import { DialogMode } from 'src/app/share/components/edit-group-dialog/mode-dialog';
import { Group } from '../../models/group.model';
import { GetGroups, HideDialog, RemoveGroup, ShowDialog, UpdateGroup } from '../../store/actions';
import { getGroupsList, getIsLoading, selectDialogGroup, selectDialogMode, selectDialogVisibility } from '../../store/selectors';
import { GroupListState } from '../../store/state';

@Injectable()
export class GroupsListService {

    constructor(private readonly store: Store<GroupListState>,
        private readonly router: Router) { }

    loadGroups(): void {
        this.store.dispatch(new GetGroups());
    }

    openGroup(groupId: number): void {
        this.router.navigate(['lesson/group', groupId]);
    }

    getList(): Observable<Group[]> {
        return this.store.select(getGroupsList);
    }

    isLoading(): Observable<boolean> {
        return this.store.select(getIsLoading);
    }


    isDialogVisible(): Observable<boolean> {
        return this.store.select(selectDialogVisibility);
    }

    getDialogMode(): Observable<DialogMode> {
        return this.store.select(selectDialogMode);
    }

    getDialogGroup(): Observable<EditGroup> {
        return this.store.select(selectDialogGroup).pipe(
            map(group => {
                return group === null || group === undefined ?
                    {} as EditGroup :
                    {
                        name: group.name,
                        id: group.id,
                        language1: group.language1,
                        language2: group.language2,
                    } as EditGroup;
            })
        );
    }

    openDialogToAdd(): void {
        this.store.dispatch(new ShowDialog({ mode: 'add' }));
    }

    openDialogToEdit(group: Group): void {
        this.store.dispatch(new ShowDialog({ mode: 'edit', group: group }));
    }

    dialogSave(group: EditGroup): void {
        this.store.dispatch(new UpdateGroup({ group: group }));
    }

    dialogCancel(): void {
        this.store.dispatch(new HideDialog());
    }

    dialogRemove(groupId: number): void {
        this.store.dispatch(new RemoveGroup({ groupId: groupId }));
    }
}
