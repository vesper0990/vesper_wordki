import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WordRowComponent } from './word-row.component';
import { Word } from '../../models/word.model';
import { MockComponent } from 'ng-mocks';
import { LabelValueComponent } from 'src/app/share/components/label-value/label-value.component';

describe('WordRowComponent', () => {
  let component: WordRowComponent;
  let fixture: ComponentFixture<WordRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WordRowComponent,
        MockComponent(LabelValueComponent)
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WordRowComponent);
    component = fixture.componentInstance;
    component.word = <Word>{};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
