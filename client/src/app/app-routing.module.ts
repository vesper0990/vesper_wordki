import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { WordkiComponent } from './wordki.component';
import { MenuComponent as WordkiMenu } from './common/components';

const routes: Routes = [
  {
    path: 'wordki',
    component: WordkiComponent,
    loadChildren: './wordki.module#WordkiModule',
  },
  {
    path: '',
    outlet: 'wordkiMenu',
    component: WordkiMenu,
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }


