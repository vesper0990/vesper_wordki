import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InsertComponent } from './components/insert/insert.component';
import { SummaryComponent } from './components/summary/summary.component';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';
import { SummaryGuardService } from './services/summary-guard/summage-guard';

const routes: Routes = [
  {
    path: 'fiszki',
    component: InsertComponent,
  },
  {
    path: 'settings',
    component: SettingsPageComponent,
  },
  {
    path: 'summary',
    component: SummaryComponent,
    canActivate: [SummaryGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LessonRoutingModule { }
