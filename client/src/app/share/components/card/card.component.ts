import { Component, OnInit, Input } from '@angular/core';
import { CardModel } from './card.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  private isAdditionInfo: boolean;

  @Input() side: 'language1' | 'language2' | 'additional' = 'language1';
  @Input() word: CardModel;
  @Input() showMore = true;
  @Input() isLock = false;

  displayingFlag: string;

  constructor() { }

  ngOnInit(): void {
    this.isAdditionInfo = false;
    this.updateSide();
  }

  private updateSide(): void {
    this.side = this.isAdditionInfo ? 'additional' : this.side;
    this.displayingFlag = this.isAdditionInfo
      ? null
      : (this.side === 'language1'
        ? this.word.language1.flag
        : this.word.language2.flag);
  }

  public changeSide(): void {
    if (this.isLock) {
      return;
    }
    this.isAdditionInfo = false;
    this.side = this.side === 'language2' ? 'language1' : 'language2';
    this.updateSide();
  }

  public showAdditionalInfo(): void {
    if (this.isLock) {
      return;
    }
    this.isAdditionInfo = true;
    this.updateSide();
  }
}
