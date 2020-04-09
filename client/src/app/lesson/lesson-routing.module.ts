import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FiszkiComponent } from './pages/fiszki/fiszki.component';
import { InsertingComponent } from './pages/inserting/inserting.component';
import { SummaryComponent } from './pages/summary/summary.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { LessonGuardService } from './services/lesson-guard/lesson.guard';
import { SummaryGuardService } from './services/summary-guard/summage-guard';

const routes: Routes = [
  {
    path: 'fiszki/:id',
    component: FiszkiComponent,
    canActivate: [LessonGuardService]
  }, {
    path: 'fiszki',
    component: FiszkiComponent,
    canActivate: [LessonGuardService]
  }, {
    path: 'inserting/:id',
    component: InsertingComponent,
    canActivate: [LessonGuardService]
  }, {
    path: 'inserting',
    component: InsertingComponent,
    canActivate: [LessonGuardService]
  }, {
    path: 'summary',
    component: SummaryComponent,
    canActivate: [SummaryGuardService]
  }, {
    path: 'settings',
    component: SettingsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LessonRoutingModule { }
