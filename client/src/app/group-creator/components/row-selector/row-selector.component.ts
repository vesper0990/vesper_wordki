import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ExtendedRowElement } from '../../model/extended-row-element';
import { RowItem } from '../../model/row-item';
import { AddRowElement, RemoveRowElemenet } from '../../store/actions';
import { selectRowElements } from '../../store/selectors';
import { GroupCreatorState } from '../../store/state';

@Component({
  selector: 'app-row-selector',
  templateUrl: './row-selector.component.html',
  styleUrls: ['./row-selector.component.scss']
})
export class RowSelectorComponent implements OnInit {

  remainingElements = this.generateRowElements();
  rowElements$: Observable<RowItem[]>;

  constructor(private readonly store: Store<GroupCreatorState>) { }

  ngOnInit(): void {
    this.rowElements$ = this.store.select(selectRowElements);
  }

  addElement(addedItem: ExtendedRowElement): void {
    if (addedItem.isDisabled) {
      return;
    }
    this.store.dispatch(new AddRowElement({ item: addedItem.item }));
    addedItem.isDisabled = !addedItem.item.multiple;
    if (addedItem.item === RowItem.END) {
      this.disableAll(this.remainingElements);
    }
  }

  removeElement(item: RowItem, index: number): void {
    this.store.dispatch(new RemoveRowElemenet({ index: index }));
    this.remainingElements.find(x => x.item === item).isDisabled = false;
  }

  private generateRowElements(): ExtendedRowElement[] {
    return RowItem.getAll().map(item => {
      return { item: item, isDisabled: false } as ExtendedRowElement;
    });
  }

  private disableAll(items: ExtendedRowElement[]): void {
    items.forEach(item => item.isDisabled = true);
  }
}
