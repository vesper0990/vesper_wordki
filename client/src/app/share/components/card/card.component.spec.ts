import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LanguageType, LanguageTypeEnum } from '../../models/language-type.mode';
import { CardComponent } from './card.component';
import { CardModel } from './card.model';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ CardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    component.word = {
      language1: LanguageType.getLanguageType(LanguageTypeEnum.English),
      language2: LanguageType.getLanguageType(LanguageTypeEnum.English),
    } as CardModel;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
