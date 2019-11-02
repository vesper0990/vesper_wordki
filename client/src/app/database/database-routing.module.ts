import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GroupsComponent } from './views/groups/groups.component';
import { GroupComponent } from './views/group/group.component';
import { AddWordsComponent } from './views/add-words/add-words.component';
import { LoginGuardService } from '../common/services/login-guard/login-guard.service';

const routes: Routes = [
    {
        path: 'groups',
        component: GroupsComponent,
        canActivate: [LoginGuardService],
    },
    {
        path: 'group/:groupId',
        component: GroupComponent,
        canActivate: [LoginGuardService],
    },
    {
        path: 'addWords',
        component: AddWordsComponent,
        canActivate: [LoginGuardService],
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule],
    providers: []
})
export class DatabaseRoutingModule { }
