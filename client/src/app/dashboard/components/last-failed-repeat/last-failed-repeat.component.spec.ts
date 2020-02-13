import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LastFailedRepeatComponent } from './last-failed-repeat.component';
import { MockComponent } from 'ng-mocks';
import { ProgressSpinnerComponent } from 'src/app/share/components/progress-spinner/progress-spinner.component';
import { Card } from 'primeng/card';
import { DataProviderBase } from '../../services/data.provider/data.provider';
import { of } from 'rxjs';

describe('LastFailedRepeatComponent', () => {
  let component: LastFailedRepeatComponent;
  let fixture: ComponentFixture<LastFailedRepeatComponent>;
  let dataProviderMock: jasmine.SpyObj<DataProviderBase>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LastFailedRepeatComponent,
        MockComponent(ProgressSpinnerComponent),
        MockComponent(Card)],
      providers: [
        { provide: DataProviderBase, useValue: jasmine.createSpyObj('dataProvider', ['getLastFailed']) }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    dataProviderMock = TestBed.get(DataProviderBase);
    dataProviderMock.getLastFailed.and.returnValue(of());
    fixture = TestBed.createComponent(LastFailedRepeatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
