import { Word } from '@app/common/models/Word';
import { LessonSettings } from '@app/common/models/model';
import { LessonResultService } from './lesson-result.service';
import { LessonCollectorService } from './lesson-collector.service';

export abstract class LessonBaseService {

  wordsQueue: Word[];
  currentWord: Word;
  counter: number;
  wordsCount: number;
  isCorrect: boolean;
  lessonSettings: LessonSettings;

  constructor(public lessonResultService: LessonResultService) {
  }

  initilize(): void {
    this.createInitialWordQueue();
    if (this.wordsQueue.length === 0) {
      console.log('Lack of words to teach');
      return;
    }
    this.lessonResultService.initializeResult(this.lessonSettings, this.wordsQueue.length);
    this.counter = 0;
    this.wordsCount = this.wordsQueue.length;
    this.currentWord = new Word();
  }

  startLesson(): void {
    this.lessonResultService.startLesson();
    this.next();
  }

  pauseLesson(): void {
    this.lessonResultService.pauseLesson();
  }

  resumeLesson(): void {
    this.lessonResultService.startLesson();
  }

  know(): void {
    if (this.counter < this.wordsCount) {
      if(this.currentWord.drawer < 4){
        this.currentWord.drawer++;
      }
      if (this.isCorrect) {
        this.lessonResultService.increaseCorrect();
      } else {
        this.lessonResultService.increaseAccepted();
      }
      this.counter++;
    }
    this.next();
  }

  unknow(): void {
    this.wordsQueue.push(this.currentWord);
    if (this.counter < this.wordsCount) {
      this.lessonResultService.increaseWrong();
      this.currentWord.drawer = 0;
      this.counter++;
    }
    this.next();
  }

  public abstract check(translation: string): void;

  private next(): void {
    if (this.wordsQueue.length <= 0) {
      this.currentWord = null;
      return;
    }
    this.currentWord = this.wordsQueue[0];
    this.wordsQueue = this.wordsQueue.slice(1);
    this.isCorrect = false;
  }

  private createInitialWordQueue(): void {
    const lessonCollector = new LessonCollectorService();
    this.wordsQueue = lessonCollector.collect(this.lessonSettings.group.words, this.lessonSettings.allWords);
  }

}
