import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [NavigationBarComponent],
  exports: [NavigationBarComponent],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class NavigationModule { }
