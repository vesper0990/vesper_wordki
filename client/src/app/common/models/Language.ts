import { LanguageEnum } from './LanguageEnum';

export class Language {

  constructor(
    public languageEnum: LanguageEnum,
    public name: string,
    public flagUrl: string) {
  }
}
