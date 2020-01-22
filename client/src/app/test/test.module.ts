import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationBarMockComponent } from './compontens.mock';

@NgModule({
  declarations: [
    NavigationBarMockComponent
  ],
  exports:[
    NavigationBarMockComponent
  ],
  imports: [
    CommonModule
  ]
})
export class TestModule { }
