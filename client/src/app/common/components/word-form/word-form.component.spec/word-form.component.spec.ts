import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { WordFormComponent } from '../word-form.component';
import { Word } from '../../../models/model';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { InputRowMockComponent } from './word-form.component.mock';

[
  null,
  new Word()
].forEach((item, index) =>
  describe(`WordFormComponent ${index}`, () => {
    let component: WordFormComponent;
    let fixture: ComponentFixture<WordFormComponent>;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [WordFormComponent, InputRowMockComponent],
        imports: [
          FormsModule
        ]
      })
        .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(WordFormComponent);
      component = fixture.componentInstance;
      component.word = item;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should have 4 inputs', () => {
      const elementsCount = fixture.debugElement.queryAll(By.css('app-input-row')).length;
      expect(elementsCount).toBe(4);
    });
  })
);
