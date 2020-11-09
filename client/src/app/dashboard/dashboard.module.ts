import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ShareModule } from '../share/share.module';
import { DashboardHttpServiceBase, DashboardHttpService, DashboardHttpMockService } from './services/dashbaord-http/dashboard-http.service';
import { environment } from 'src/environments/environment';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { DashboardEffects } from './store/effects';
import { dashboardReducer } from './store/reducer';

@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ShareModule,
    CardModule,
    CarouselModule,
    StoreModule.forFeature('dashboardStore', dashboardReducer),
    EffectsModule.forFeature([DashboardEffects]),
  ],
  providers: [
    { provide: DashboardHttpServiceBase, useClass: environment.mockServer ? DashboardHttpService : DashboardHttpMockService },
  ]
})
export class DashboardModule { }
