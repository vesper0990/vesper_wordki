import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationBarComponentMock } from './compontens.mock';

@NgModule({
  declarations: [
    NavigationBarComponentMock
  ],
  exports:[
    NavigationBarComponentMock
  ],
  imports: [
    CommonModule
  ]
})
export class TestModule { }
