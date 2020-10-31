import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Group } from "../../models/group.model";
import { GetGroups } from "../../store/actions";
import { getGroupsList, getIsLoading } from "../../store/selectors";
import { GroupListState } from "../../store/state";

@Injectable()
export class GroupsListService {

    constructor(private readonly store: Store<GroupListState>, 
        private readonly router: Router) { }

    loadGroups(): void{
        this.store.dispatch(new GetGroups());
    }

    openGroup(groupId: number): void{
        this.router.navigate(['lesson/group', groupId]);
    }

    getList(): Observable<Group[]> {
        return this.store.select(getGroupsList);
    }

    isLoading(): Observable<boolean>{
        return this.store.select(getIsLoading);
    }



}