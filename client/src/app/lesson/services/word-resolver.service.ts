import { Word } from '@app/common/models/Word';
import { TranslationDirectionEnum } from '@app/common/models/model';

export class WordResolver {
  public static getQuestionExample(word: Word, translationDirection: TranslationDirectionEnum): string {
    switch (translationDirection) {
      case TranslationDirectionEnum.FromFirst: {
        return word.language1Example;
      }
      case TranslationDirectionEnum.FromSecond: {
        return word.language2Example;
      }
      default:
        console.error('translationDirection wrong value');
    }
  }

  public static getAnswareExample(word: Word, translationDirection: TranslationDirectionEnum): string {
    switch (translationDirection) {
      case TranslationDirectionEnum.FromFirst: {
        return word.language2Example;
      }
      case TranslationDirectionEnum.FromSecond: {
        return word.language1Example;
      }
      default:
        console.error('translationDirection wrong value');
    }
  }

  public static getAnsware(word: Word, translationDirection: TranslationDirectionEnum): string {
    switch (translationDirection) {
      case TranslationDirectionEnum.FromFirst: {
        return word.language2;
      }
      case TranslationDirectionEnum.FromSecond: {
        return word.language1;
      }
      default:
        console.error('translationDirection wrong value');
    }
  }

  public static getQuestion(word: Word, translationDirection: TranslationDirectionEnum): string {
    switch (translationDirection) {
      case TranslationDirectionEnum.FromFirst: {
        return word.language1;
      }
      case TranslationDirectionEnum.FromSecond: {
        return word.language2;
      }
      default:
        console.error('translationDirection wrong value');
    }
  }
}
