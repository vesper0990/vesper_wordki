import { WordResolver } from './word-resolver.service';
import { Word } from '@app/common/models/Word';
import { TranslationDirectionEnum } from '@app/common/models/model';

export class WordComparerService {

  separator = ',';

  constructor(private translationDirection: TranslationDirectionEnum) {
  }

  compare(word: Word, translation: string): boolean {
    return this.checkTranslations(this.splitWithSeparator(WordResolver.getAnsware(word, this.translationDirection)), translation);
  }

  private splitWithSeparator(word: string): string[] {
    return word.split(this.separator);
  }

  private checkTranslations(originals: string[], translation: string): boolean {
    for (let i = 0; i < originals.length; i++) {
      if (originals[i].trim().toLocaleLowerCase() === translation.toLocaleLowerCase()) {
        return true;
      }
    }
    return false;
  }
}
