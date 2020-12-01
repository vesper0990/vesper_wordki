import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {
  private readonly maxItemsCount = 7;

  private _pagesCount = 0;
  @Input() set pagesCount(val: number) {
    this._pagesCount = val;
    this.recalculateItems();
  }

  private _currentPage = 0;
  @Input() set currentPage(val: number) {
    this._currentPage = val;
    this.isFirst = val === 1;
    this.isLast = val === this._pagesCount;
    console.log(this.isFirst, this.isLast);
    this.recalculateItems();
  }

  @Output() currentPageChanged = new EventEmitter<number>();

  items: { label: number, isSelected: boolean }[];
  isFirst: boolean;
  isLast: boolean;

  constructor() { }

  ngOnInit(): void {
    this.recalculateItems();
  }

  changePage(item: { label: number, isSelected: boolean }): void {
    this.currentPage = item.label;
    this.currentPageChanged.emit(this._currentPage);
  }

  previousPage(): void {
    if (this._currentPage === 1) {
      return;
    }
    this.currentPage = this._currentPage - 1;
    this.currentPageChanged.emit(this._currentPage);
  }

  nextPage(): void {
    if (this._currentPage === this._pagesCount) {
      return;
    }
    this.currentPage = this._currentPage + 1;
    this.currentPageChanged.emit(this._currentPage);
  }

  first(): void {
    this.currentPage = 1;
    this.currentPageChanged.emit(this._currentPage);
  }

  last(): void {
    this.currentPage = this._pagesCount;
    this.currentPageChanged.emit(this._currentPage);
  }

  private recalculateItems(): void {
    if (this._pagesCount === 0 || this._pagesCount === undefined ||
      this._currentPage === 0 || this._currentPage === undefined) {
      return;
    }
    const items = [];
    const first = this.findFirstElement();
    const last = this.findLastElement();
    for (let i = first; i <= last; i++) {
      items.push({ label: i, isSelected: i === this._currentPage });
    }
    this.items = items;
  }

  private findFirstElement(): number {
    let firstElement = this._currentPage - 3;
    if (firstElement < 1) {
      firstElement = 1;
    }
    return firstElement;
  }

  private findLastElement(): number {
    let lastElement = this._currentPage + 3;
    if (lastElement > this._pagesCount) {
      lastElement = this._pagesCount;
    }
    return lastElement;
  }
}
