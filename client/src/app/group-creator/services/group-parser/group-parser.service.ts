import { Injectable } from '@angular/core';
import { RowItem } from '../../model/row-item';
import { RowElementEnum } from '../../model/row-element.enum';
import { CardParsed } from '../../model/card-parsed';


@Injectable()
export class GroupParserService {
  constructor() { }

  parseFile(fileContent: string, rowElements: RowItem[]): CardParsed[] {
    const lines = fileContent.split('\n');
    if (lines.length === 0) {
      return null;
    }
    return lines.map(line => this.parseLine(line, rowElements))
      .filter(card => card !== null);
  }

  parseLine(line: string, rowElements: RowItem[]): CardParsed {
    const result = new CardParsed();
    const regExp = new RegExp(this.createSeparatorRegExp(rowElements));
    const lineElements = line.split(regExp);
    const interpretableElements = rowElements.filter(item => item.interpretable);
    if (lineElements.length !== interpretableElements.length) {
      return null;
    }
    for (let i = 0; i < lineElements.length; i++) {
      this.interpretItem(result, lineElements[i].trim(), interpretableElements[i]);
    }
    console.log(result);
    return result;
  }

  interpretItem(card: CardParsed, item: string, rowElement: RowItem): void {
    switch (rowElement.type) {
      case RowElementEnum.FrontValue: {
        card.frontValue = item;
        break;
      }
      case RowElementEnum.FrontExample: {
        card.frontExample = item;
        break;
      }
      case RowElementEnum.BackValue: {
        card.backValue = item;
        break;
      }
      case RowElementEnum.BackExample: {
        card.backExample = item;
        break;
      }
    }
  }

  createSeparatorRegExp(rowElements: RowItem[]): string {
    return rowElements.filter(item => item.type === RowElementEnum.Separator)
      .map(item => item.value)
      .join('|');
  }
}
