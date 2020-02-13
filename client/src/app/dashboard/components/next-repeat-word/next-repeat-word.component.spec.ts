import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NextRepeatWordComponent } from './next-repeat-word.component';
import { MockComponent } from 'ng-mocks';
import { ProgressSpinnerComponent } from 'src/app/share/components/progress-spinner/progress-spinner.component';
import { Card } from 'primeng/card/';
import { DataProviderBase } from '../../services/data.provider/data.provider';
import { of } from 'rxjs';

describe('NextRepeatWordComponent', () => {
  let component: NextRepeatWordComponent;
  let fixture: ComponentFixture<NextRepeatWordComponent>;
  let dataProviderMock: jasmine.SpyObj<DataProviderBase>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NextRepeatWordComponent,
        MockComponent(ProgressSpinnerComponent),
        MockComponent(Card)],
      providers: [
        { provide: DataProviderBase, useValue: jasmine.createSpyObj('dataProvider', ['getNextRepeatWord']) }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    dataProviderMock = TestBed.get(DataProviderBase);
    dataProviderMock.getNextRepeatWord.and.returnValue(of());
    fixture = TestBed.createComponent(NextRepeatWordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
