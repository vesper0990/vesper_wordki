import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NewestWordsComponent } from './newest-words.component';
import { MockComponent } from 'ng-mocks';
import { Carousel } from 'primeng/carousel';
import { ProgressSpinnerComponent } from 'src/app/share/components/progress-spinner/progress-spinner.component';
import { Card } from 'primeng/card';
import { DataProvider, DataProviderBase } from '../../services/data.provider/data.provider';
import { of } from 'rxjs';

describe('NewestWordComponent', () => {
  let component: NewestWordsComponent;
  let fixture: ComponentFixture<NewestWordsComponent>;
  let dataProviderMock: jasmine.SpyObj<DataProviderBase>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewestWordsComponent,
        MockComponent(Carousel),
        MockComponent(Card),
        MockComponent(ProgressSpinnerComponent)],
      providers: [
        { provide: DataProviderBase, useValue: jasmine.createSpyObj('dataProvider', ['getLastWords']) }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    dataProviderMock = TestBed.get(DataProviderBase);
    dataProviderMock.getLastWords.and.returnValue(of());
    fixture = TestBed.createComponent(NewestWordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
