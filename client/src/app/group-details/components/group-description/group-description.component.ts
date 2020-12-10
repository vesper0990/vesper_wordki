import { Component, Input, OnInit } from '@angular/core';
import { LanguageType, LanguageTypeEnum } from 'src/app/share/models/language-type.mode';

@Component({
  selector: 'app-group-description',
  templateUrl: './group-description.component.html',
  styleUrls: ['./group-description.component.scss']
})
export class GroupDescriptionComponent implements OnInit {

  @Input() groupName = "";
  @Input() wordsCount = 0;
  @Input() language1 = LanguageType.getLanguageType(LanguageTypeEnum.Undefined);
  @Input() language2 = LanguageType.getLanguageType(LanguageTypeEnum.Undefined);
  @Input() creationDate = new Date();
  @Input() repeatsCount = 0;

  constructor() { }

  ngOnInit(): void {
  }
}
