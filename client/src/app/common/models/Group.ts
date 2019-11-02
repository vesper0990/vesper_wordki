import { Word } from './Word';
import { Result } from './Result';
import { LanguageEnum } from './LanguageEnum';

export class Group {
  id: string;
  name: string;
  language1: LanguageEnum = LanguageEnum.Unknown;
  language2: LanguageEnum = LanguageEnum.Unknown;
  creationDate: Date;
  words: Word[] = [];
  results: Result[] = [];

  deserialize(input: any): this {
    Object.assign(this, input);
    for (let i = 0; i < this.words.length; i++) {
      this.words[i] = new Word().deserialize(this.words[i]);
    }
    for (let i = 0; i < this.words.length; i++) {
      this.results[i] = new Result().deserialize(this.results[i]);
    }
    return this;
  }

}
