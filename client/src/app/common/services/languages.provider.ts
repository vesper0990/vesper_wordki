import { Language, LanguageEnum } from '../models/model';

export class LanguagesProvider {

  static languages: Language[] = [
    new Language(LanguageEnum.Unknown, 'Unknown', '/../../assets/img/unknown.svg'),
    new Language(LanguageEnum.English, 'English', '/../../assets/img/english.svg'),
    new Language(LanguageEnum.Polish, 'Polski', '/../../assets/img/polish.svg')
  ];
}
