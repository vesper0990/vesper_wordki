import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-group-creator',
  templateUrl: './group-creator.component.html',
  styleUrls: ['./group-creator.component.scss']
})
export class GroupCreatorComponent implements OnInit {

  fileContent: string;

  elements = [{
    label: 'Front word',
    value: 0
  },
  {
    label: 'Front example',
    value: 1
  },
  {
    label: 'Back word',
    value: 2
  },
  {
    label: 'Back example',
    value: 3
  }];

  dropDownValue = this.elements[0];

  elementsOrder = [];

  constructor() { }

  ngOnInit(): void {
    this.fileContent = '';
  }

  generate(): void {
  }

  addElement(): void {
    const index = this.elements.findIndex(item => item.value === this.dropDownValue.value);
    this.elementsOrder.push(this.dropDownValue);
    this.elements.splice(index, 1);
    this.dropDownValue = this.elements[0];
    this.elements = Array.from(this.elements);
  }

}

export enum RowElementEnum {
  Const = 'Constant value',
  Separator = 'Separator',
  FrontValue = 'Front word',
  FrontExample = 'Front example',
  BackValue = 'Back value',
  BackExample = 'Back example'
}

export class RowItem {
  label: string;
  value: RowElementEnum;
}
