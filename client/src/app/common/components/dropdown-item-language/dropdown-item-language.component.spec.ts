import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropDownItemLanguageComponent } from './dropdown-item-language.component';
import { FormsModule } from '@angular/forms';
import { Language, LanguageEnum } from '../../models/model';

[
  null,
  new Language(LanguageEnum.English, 'name', 'flagUrl')
].forEach((item, index) =>
  describe(`LanguageDropDownComponent ${index}`, () => {
    let component: DropDownItemLanguageComponent;
    let fixture: ComponentFixture<DropDownItemLanguageComponent>;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [DropDownItemLanguageComponent],
        imports: [
          FormsModule
        ]
      })
        .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(DropDownItemLanguageComponent);
      component = fixture.componentInstance;
      component.language = item;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
  })
);
