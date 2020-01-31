import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FiszkiComponent } from './pages/fiszki/fiszki.component';
import { InsertingComponent } from './pages/inserting/inserting.component';
import { SummaryComponent } from './pages/summary/summary.component';

const routes: Routes = [
  {
    path: 'fiszki/:id',
    component: FiszkiComponent
  }, {
    path: 'fiszki',
    component: FiszkiComponent
  }, {
    path: 'inserting/:id',
    component: InsertingComponent
  }, {
    path: 'inserting',
    component: InsertingComponent
  }, {
    path: 'summary',
    component: SummaryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LessonRoutingModule { }
