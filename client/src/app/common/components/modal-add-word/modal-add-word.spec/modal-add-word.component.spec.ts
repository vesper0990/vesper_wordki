import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddWordComponent } from '../modal-add-word.component';
import { WordFormMockComponent } from './modal-add-word.component.mocks';
import { ModalBaseComponent } from '../../modal-base/modal-base.component';
import { WordSenderBase, WordSenderMock } from '@app/common/services/data/data.service';
import { By } from '@angular/platform-browser';

describe('ModalAddWordComponent', () => {
  let component: ModalAddWordComponent;
  let fixture: ComponentFixture<ModalAddWordComponent>;
  let wordSenderMock: WordSenderMock;

  beforeEach(async(() => {
    wordSenderMock = new WordSenderMock();
    TestBed.configureTestingModule({
      declarations: [
        ModalBaseComponent,
        ModalAddWordComponent,
        WordFormMockComponent
      ],
      providers: [
        { provide: WordSenderBase, useValue: wordSenderMock }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddWordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should try to send word after approved button click', () => {
    spyOn(wordSenderMock, 'add').and.callThrough();
    component.word.language1 = 'test';
    component.word.language2 = 'test';
    component.word.language1Example = 'test';
    component.word.language2Example = 'test';

    fixture.debugElement.query(By.css('#confirmButton')).nativeElement.click();

    expect(wordSenderMock.add).toHaveBeenCalledWith(component.word);
  });
});
