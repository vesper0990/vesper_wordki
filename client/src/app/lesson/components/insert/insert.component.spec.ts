import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertComponent } from './insert.component';
import { LessonStep, LessonStateEnum } from '../../models/lesson-state';
import { WordRepeat } from '../../models/word-repeat';
import { ObservableMock } from 'src/app/test/utils';
import { FiszkaComponent } from '../fiszka/fiszka.component';
import { Store } from '@ngrx/store';
import { LessonState } from '../../store/reducer';
import { getLessonStateEnum, selectCurrentCard } from '../../store/selectors';
import { FormsModule } from '@angular/forms';
import { WordComparerService } from '../../services/word-comparer/word-comparer.service';

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

describe('InsertComponent', () => {
  const lessonStepObservable = new ObservableMock<LessonStep>();
  const wordRepeatObservable = new ObservableMock<WordRepeat>();
  let component: InsertComponent;
  let fixture: ComponentFixture<InsertComponent>;
  let storeMock: jasmine.SpyObj<Store<LessonState>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule
      ],
      declarations: [InsertComponent,
      ],
      providers: [
        { provide: Store, useValue: jasmine.createSpyObj('store', ['select', 'dispatch']) },
        { provide: WordComparerService, useValue: jasmine.createSpyObj('wordComparer', ['isCorrect']) }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    storeMock = TestBed.get(Store);
    storeMock.select.withArgs(getLessonStateEnum)
      .and.returnValue(lessonStepObservable.getSource());
    storeMock.select.withArgs(selectCurrentCard)
      .and.returnValue(wordRepeatObservable.getSource());
    fixture = TestBed.createComponent(InsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
