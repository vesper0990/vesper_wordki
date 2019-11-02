import { Component, OnInit, Input } from '@angular/core';
import { LanguagesProvider } from '../../services/languages.provider';
import { GroupFromModel } from './group-form.model';

@Component({
  selector: 'app-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.scss']
})
export class GroupFormComponent implements OnInit {

  @Input() model: GroupFromModel;
  languages = LanguagesProvider.languages;

  constructor() { }

  ngOnInit() {
  }
  
  click():void{
    
    console.log(this.model);
  }

}
