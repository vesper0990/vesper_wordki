import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WordRowComponent } from './word-row.component';
import { MockComponent } from 'ng-mocks';
import { LabelValueComponent } from 'src/app/share/components/label-value/label-value.component';
import { createCardDetails } from 'src/app/test/builders.spec';

describe('WordRowComponent', () => {
  let component: WordRowComponent;
  let fixture: ComponentFixture<WordRowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WordRowComponent,
        MockComponent(LabelValueComponent)
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WordRowComponent);
    component = fixture.componentInstance;
    component.word = createCardDetails();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
