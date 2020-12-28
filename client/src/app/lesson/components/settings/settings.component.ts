import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CardRepeat } from 'src/app/share/models/card-details';
import { SettingsService } from './services/settings/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  dialogVisiblity: boolean;
  currentCard$: Observable<CardRepeat>;

  constructor(private readonly service: SettingsService) { }

  ngOnInit(): void {
    this.currentCard$ = this.service.getCurrentCard();
  }

  clickEdit(): void {
    this.dialogVisiblity = true;
  }

  onEditSave(): void {
    this.dialogVisiblity = false;
  }

  onEditCance(): void {
    this.dialogVisiblity = false;
  }

  onEditRemove(): void {
    this.dialogVisiblity = false;
  }

}
