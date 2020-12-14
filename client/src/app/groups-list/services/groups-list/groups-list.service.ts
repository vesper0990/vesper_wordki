import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EditGroup } from 'src/app/share/components/edit-group-dialog/edit-group.model';
import { DialogMode } from 'src/app/share/components/edit-group-dialog/mode-dialog';
import { Group } from 'src/app/share/models/card-details';
import { LanguageType, LanguageTypeEnum } from 'src/app/share/models/language-type.mode';
import { AddGroup, GetGroups, HideDialog, RemoveGroup, ShowDialog, UpdateGroup } from '../../store/actions';
import { getGroupsList, getIsLoading, selectDialogGroup, selectDialogMode, selectDialogVisibility } from '../../store/selectors';
import { GroupListState } from '../../store/state';

@Injectable()
export class GroupsListService {

    constructor(private readonly store: Store<GroupListState>,
        private readonly router: Router) { }

    loadGroups(): void {
        this.store.dispatch(new GetGroups());
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
                return group === null || group === undefined
                    ? new EditGroup(0, '', LanguageType.getLanguageType(LanguageTypeEnum.Undefined), LanguageType.getLanguageType(LanguageTypeEnum.Undefined))
                    : new EditGroup(group.id, group.name, group.languageFront, group.languageBack);
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
        console.log(group);
        if (group.id !== 0 && group.id !== undefined) {
            this.store.dispatch(new UpdateGroup({ group: group }));
        } else {
            this.store.dispatch(new AddGroup({ group: group }));
        }
    }

    dialogCancel(): void {
        this.store.dispatch(new HideDialog());
    }

    dialogRemove(groupId: number): void {
        this.store.dispatch(new RemoveGroup({ groupId: groupId }));
    }

    showDetails(groupId: number): void {
        const id = groupId;
        this.router.navigate(['/details', id]);
    }
}
