import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Drawer, ExtendedCardDetails, SideDetails } from '../../models/card-details';
import { LanguageType } from '../../models/language-type.mode';
import { CardComponent } from './card.component';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    component.card = createCardMock();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

function createCardMock(): ExtendedCardDetails {
  return new ExtendedCardDetails(
    1, 'group-name',
    new SideDetails('front-value', 'front-example', new Drawer(1), LanguageType.getLanguageType(1), 1, true, new Date),
    new SideDetails('back-value', 'back-example', new Drawer(1), LanguageType.getLanguageType(1), 1, true, new Date),
  );
}
