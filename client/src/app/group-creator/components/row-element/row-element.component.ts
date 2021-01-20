import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-row-element',
  templateUrl: './row-element.component.html',
  styleUrls: ['./row-element.component.scss']
})
export class RowElementComponent implements OnInit {

  @Input() label = '';
  @Input() value: any;
  @Input() icon = '';
  @Input() isDisabled = false;

  constructor() { }

  ngOnInit(): void {
  }

}
