import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupDetailsComponent } from './group-details.component';
import { GroupsDetailsRoutingModule } from './group-details-routing.module';
import { WordRowComponent } from './components/word-row/word-row.component';



@NgModule({
  declarations: [GroupDetailsComponent, WordRowComponent],
  imports: [
    CommonModule,
    GroupsDetailsRoutingModule
  ]
})
export class GroupDetailsModule { }
