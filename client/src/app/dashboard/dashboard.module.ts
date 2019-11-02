import { NgModule } from '@angular/core';
import { CommonModule as AnuglarCommon } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MainComponent } from './views/main/main.component';
import { CommonModule } from '../common/common.module';

@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    AnuglarCommon,
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
