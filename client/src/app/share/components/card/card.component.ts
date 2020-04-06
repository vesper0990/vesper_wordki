import { Component, OnInit, Input } from '@angular/core';
import { CardModel } from './card.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  private isAdditionInfo: boolean;
  private isLanguage1: boolean;

  side: 'language1' | 'language2' | 'additional';
  @Input() word: CardModel;
  @Input() showMore = true;

  constructor() { }

  ngOnInit(): void {
    this.side = 'language1';
    this.isAdditionInfo = false;
    this.isLanguage1 = true;
  }

  private updateSide(): void {
    this.side = this.isAdditionInfo ? 'additional' : this.isLanguage1 ? 'language1' : 'language2';
  }

  public changeSide(): void {
    if (!this.isAdditionInfo) {
      this.isLanguage1 = !this.isLanguage1;
    }
    this.isAdditionInfo = false;
    this.updateSide();
  }

  public showAdditionalInfo(): void {
    this.isAdditionInfo = true;
    this.updateSide();
  }
}
