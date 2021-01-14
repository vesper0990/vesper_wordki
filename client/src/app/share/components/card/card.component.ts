import { Component, OnInit, Input } from '@angular/core';
import { ExtendedCardDetails } from '../../models/card-details';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() side: 'language1' | 'language2' = 'language1';
  @Input() card: ExtendedCardDetails;
  @Input() showMore = true;
  @Input() isLock = false;

  displayingFlag: string;

  constructor() { }

  ngOnInit(): void {
    this.updateSide();
  }

  private updateSide(): void {
    this.displayingFlag = this.side === 'language1'
      ? this.card.front.language.flag
      : this.card.back.language.flag;
  }

  public changeSide(): void {
    if (this.isLock) {
      return;
    }
    this.side = this.side === 'language2' ? 'language1' : 'language2';
    this.updateSide();
  }
}
