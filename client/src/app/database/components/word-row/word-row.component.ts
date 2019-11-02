import { Component, OnInit, Input } from '@angular/core';
import { WordRowModel } from './word-row.model';

@Component({
  selector: 'app-word-row',
  templateUrl: './word-row.component.html',
  styleUrls: ['./word-row.component.scss']
})
export class WordRowComponent implements OnInit {

  @Input() word: WordRowModel;
  @Input() showMore: boolean;

  constructor() {
  }

  ngOnInit(): void {
  }

}
