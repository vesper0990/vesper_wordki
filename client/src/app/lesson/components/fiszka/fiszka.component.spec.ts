import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FiszkaComponent } from './fiszka.component';
import { Store } from '@ngrx/store';
import { ObservableMock, selectDebugElementById } from 'src/app/test/utils';
import { LessonStep, LessonStateEnum } from '../../models/lesson-state';
import { WordRepeat } from '../../models/word-repeat';
import { selectCurrentCard } from '../../store/selectors';
import { LessonState } from '../../store/state';

class BeforeLessonContext {
  givenState = LessonStep.getLessonStep(LessonStateEnum.BEFORE_START);
  givenWord = <WordRepeat>{};

  expectedQuestionVisibility = false;
  expectedAnswerVisibility = false;
}

class WordDisplayContext {
  givenState = LessonStep.getLessonStep(LessonStateEnum.QUESTION);
  givenWord = <WordRepeat>{};

  expectedQuestionVisibility = true;
  expectedAnswerVisibility = false;
}

class AnswerDisplayContext {
  givenState = LessonStep.getLessonStep(LessonStateEnum.ANSWARE);
  givenWord = <WordRepeat>{};

  expectedQuestionVisibility = true;
  expectedAnswerVisibility = true;
}

describe('FiszkaComponent', () => {
  const lessonStepObservable = new ObservableMock<LessonStep>();
  const wordRepeatObservable = new ObservableMock<WordRepeat>();
  let component: FiszkaComponent;
  let fixture: ComponentFixture<FiszkaComponent>;
  let storeMock: jasmine.SpyObj<Store<LessonState>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FiszkaComponent],
      providers: [
        {
          provide: Store,
          useValue: jasmine.createSpyObj('store', ['select', 'dispatch'])
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    // storeMock = TestBed.get(Store);
    // storeMock.select.withArgs(getLessonStateEnum)
    //   .and.returnValue(lessonStepObservable.getSource());
    // storeMock.select.withArgs(selectCurrentCard)
    //   .and.returnValue(wordRepeatObservable.getSource());
    fixture = TestBed.createComponent(FiszkaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  [
    new BeforeLessonContext(),
    new WordDisplayContext(),
    new AnswerDisplayContext()
  ].forEach((context, index) => {

    describe(`in ${index} context`, () => {

      beforeEach(() => {
        lessonStepObservable.next(context.givenState);
        wordRepeatObservable.next(context.givenWord);
        fixture.detectChanges();
      });

      it('check question visibility', () => {
        const questionElementVisibilty = selectDebugElementById<FiszkaComponent>(fixture, 'question') !== null;
        expect(questionElementVisibilty).toBe(context.expectedQuestionVisibility);
      });

      it('check answer visibility', () => {
        const answetElementVisibilty = selectDebugElementById<FiszkaComponent>(fixture, 'answer') !== null;
        expect(answetElementVisibilty).toBe(context.expectedAnswerVisibility);
      });

    });
  });

});
