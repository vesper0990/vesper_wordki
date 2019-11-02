import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LessonSettingsComponent } from './views/lesson-settings/lesson-settings.component';
import { LessonResultComponent } from './views/lesson-result/lesson-result.component';
import { TypingComponent } from './views/typing/typing.component';
import { FiszkiComponent } from './views/fiszki/fiszki.component';
import { LoginGuardService } from '../common/services/login-guard/login-guard.service';

const routes: Routes = [
    {
        path: 'settings',
        component: LessonSettingsComponent,
        canActivate: [LoginGuardService],
    },
    {
        path: 'results',
        component: LessonResultComponent,
        canActivate: [LoginGuardService],
    },
    {
        path: 'typing',
        component: TypingComponent,
        canActivate: [LoginGuardService],
    },
    {
        path: 'fiszki',
        component: FiszkiComponent,
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
export class LessonRoutingModule { }
