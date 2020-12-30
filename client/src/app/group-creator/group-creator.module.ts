import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupCreatorComponent } from './group-creator.component';
import { GroupsCreatorRoutingModule } from './group-creator-routing.module';
import { GroupCreatorService } from './services/group-creator/group-creator.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';



@NgModule({
  declarations: [GroupCreatorComponent],
  imports: [
    CommonModule,
    GroupsCreatorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule
  ],
  providers: [
    GroupCreatorService
  ]
})
export class GroupCreatorModule { }
