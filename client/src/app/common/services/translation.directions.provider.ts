import { TranslationDirection, TranslationDirectionEnum } from '../models/model';

export class TranslationDirectionProvider {

  static translationDirections: TranslationDirection[] = [
    new TranslationDirection(TranslationDirectionEnum.FromFirst, 'Z pierwszego'),
    new TranslationDirection(TranslationDirectionEnum.FromSecond, 'Z drugiego'),
  ];
}
