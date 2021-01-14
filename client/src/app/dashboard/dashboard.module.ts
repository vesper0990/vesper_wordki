import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ShareModule } from '../share/share.module';
import { DashboardHttpService } from './services/dashbaord-http/dashboard-http.service';
import { DashboardHttpMockService } from './services/dashbaord-http/dashboard-http.service.mock';
import { DashboardHttpServiceBase } from './services/dashbaord-http/dashboard-http.service.base';
import { environment } from 'src/environments/environment';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { DashboardEffects } from './store/effects';
import { dashboardReducer } from './store/reducer';
import { DashboardService } from './services/dashboard/dashboard.service';

@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ShareModule,
    StoreModule.forFeature('dashboardStore', dashboardReducer),
    EffectsModule.forFeature([DashboardEffects]),
  ],
  providers: [
    { provide: DashboardHttpServiceBase, useClass: environment.mockServer ? DashboardHttpMockService : DashboardHttpService },
    DashboardService
  ]
})
export class DashboardModule { }
