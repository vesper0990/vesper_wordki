import { RowElementEnum } from './row-element.enum';

export class RowItem {

  static SEPARATOR = new RowItem(RowElementEnum.Separator, 'Separator', true, false);
  static FRONT_VALUE = new RowItem(RowElementEnum.FrontValue, 'Front word', false, true);
  static FRONT_EXAMPLE = new RowItem(RowElementEnum.FrontExample, 'Front example', false, true);
  static BACK_VALUE = new RowItem(RowElementEnum.BackValue, 'Back word', false, true);
  static BACK_EXAMPLE = new RowItem(RowElementEnum.BackExample, 'Back example', false, true);
  // static DRAWER = new RowItem(RowElementEnum.Drawer, 'Drawer', false, true);
  static END = new RowItem(RowElementEnum.End, 'End of line', false, false);

  public value = '-';

  constructor(public type: RowElementEnum,
    public label: string,
    public multiple: boolean,
    public interpretable: boolean) { }

  static getAll(): RowItem[] {
    return [
      RowItem.SEPARATOR,
      RowItem.FRONT_VALUE,
      RowItem.FRONT_EXAMPLE,
      RowItem.BACK_VALUE,
      RowItem.BACK_EXAMPLE,
      // RowItem.DRAWER,
      RowItem.END
    ];
  }

  static get(type: RowElementEnum): RowItem {
    return this.getAll().find(x => x.type === type);
  }
}
