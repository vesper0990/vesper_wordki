import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { ControlButtonsComponent } from './control-buttons.component';
import { LessonState } from '../../store/reducer';
import { getLessonStateEnum, getFirstWord, getLastAnswer } from '../../store/selectors';
import { LessonStep, LessonStateEnum } from '../../models/lesson-state';
import { ObservableMock } from 'src/app/test/utils';
import { By } from '@angular/platform-browser';
import { WordRepeat } from '../../models/word-repeat';
import { DebugElement } from '@angular/core';
import { StartLessonAction, CheckAnswerAction, AnswerAction } from '../../store/actions';

describe('ControlButtonsComponent', () => {
  const lessonStepObservable = new ObservableMock<LessonStep>();
  const wordRepeatObservable = new ObservableMock<WordRepeat>();
  const lastAnswerObservable = new ObservableMock<boolean>();
  let component: ControlButtonsComponent;
  let fixture: ComponentFixture<ControlButtonsComponent>;
  let storeMock: jasmine.SpyObj<Store<LessonState>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ControlButtonsComponent],
      providers: [
        { provide: Store, useValue: jasmine.createSpyObj('store', ['select', 'dispatch', 'unsubscribe']) }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    storeMock = TestBed.get(Store);
    storeMock.select.withArgs(getLessonStateEnum).and
      .returnValue(lessonStepObservable.getSource());
    storeMock.select.withArgs(getFirstWord).and
      .returnValue(wordRepeatObservable.getSource());
    storeMock.select.withArgs(getLastAnswer).and
      .returnValue(lastAnswerObservable.getSource());
    fixture = TestBed.createComponent(ControlButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('in BeforeStart state', () => {
    let startButton: DebugElement;

    beforeEach(() => {
      lessonStepObservable.next(LessonStep.getLessonStep(LessonStateEnum.BeforeStart));
      fixture.detectChanges();
      const buttons = fixture.debugElement.queryAll(By.css('button'));
      startButton = buttons[0];
    });

  });

  describe('in WordDisplay state', () => {
    let checkButton: DebugElement;

    beforeEach(() => {
      lessonStepObservable.next(LessonStep.getLessonStep(LessonStateEnum.WordDisplay));
      fixture.detectChanges();
      const buttons = fixture.debugElement.queryAll(By.css('button'));
      checkButton = buttons[0];
    });

    it('should display Check button', () => {
      expect(checkButton).toBeTruthy();
      expect(checkButton.nativeElement.innerHTML).toBe('Check');
    });

    it('should be possible to check answer', () => {
      checkButton.nativeElement.click();
      fixture.detectChanges();
      expect(storeMock.dispatch).toHaveBeenCalledTimes(1);
      expect(storeMock.dispatch).toHaveBeenCalledWith(new CheckAnswerAction());
    });
  });

  describe('in AnswerDisplay state', () => {
    let correctButton: DebugElement;
    let incorrectButton: DebugElement;
    const wordRepeat = <WordRepeat>{
      id: 1,
      drawer: 1,
      language1: 'test',
      language2: 'test'
    };

    beforeEach(() => {
      lessonStepObservable.next(LessonStep.getLessonStep(LessonStateEnum.AnswerDisplay));
      wordRepeatObservable.next(wordRepeat);
      lastAnswerObservable.next(true);
      fixture.detectChanges();
      const buttons = fixture.debugElement.queryAll(By.css('button'));
      incorrectButton = buttons[0];
      correctButton = buttons[1];
    });

    it('should display Correct button', () => {
      expect(correctButton).toBeTruthy();
      expect(correctButton.nativeElement.innerHTML).toBe('Correct');
    });

    it('should display Incorrect button', () => {
      expect(incorrectButton).toBeTruthy();
      expect(incorrectButton.nativeElement.innerHTML).toBe('Incorrect');
    });

    it('should be possible to correct answer', () => {
      correctButton.nativeElement.click();
      fixture.detectChanges();
      expect(storeMock.dispatch).toHaveBeenCalledTimes(1);
      expect(storeMock.dispatch).toHaveBeenCalledWith(new AnswerAction({ wordId: 1, result: 1 }));
    });

    it('should be possible to correct answer', () => {
      incorrectButton.nativeElement.click();
      fixture.detectChanges();
      expect(storeMock.dispatch).toHaveBeenCalledTimes(1);
      expect(storeMock.dispatch).toHaveBeenCalledWith(new AnswerAction({ wordId: 1, result: -1 }));
    });
  });
});
