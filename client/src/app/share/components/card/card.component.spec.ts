import { ComponentFixture, TestBed } from '@angular/core/testing';
import { selectNativeElementByClass } from 'src/app/test/utils.spec';
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
    expect(component.displayingFlag).toBe(component.card.front.language.flag);
  });

  it('shoudl changeSide multiple time', () => {
    const element = selectNativeElementByClass(fixture, 'content-container');
    element.click();
    expect(component.displayingFlag).toBe(component.card.back.language.flag);
    expect(component.side).toBe('language2');
    element.click();
    expect(component.displayingFlag).toBe(component.card.front.language.flag);
    expect(component.side).toBe('language1');
  });

  it('should not changeSide if is locked', () => {
    component.isLock = true;
    fixture.detectChanges();

    const element = selectNativeElementByClass(fixture, 'content-container');
    element.click();

    expect(component.displayingFlag).toBe(component.card.front.language.flag);
    expect(component.side).toBe('language1');
  });


});

function createCardMock(): ExtendedCardDetails {
  return new ExtendedCardDetails(
    1, 'group-name',
    new SideDetails('front-value', 'front-example', new Drawer(1), LanguageType.getLanguageType(1), 1, true, new Date),
    new SideDetails('back-value', 'back-example', new Drawer(1), LanguageType.getLanguageType(2), 1, true, new Date),
  );
}
