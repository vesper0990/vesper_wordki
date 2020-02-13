import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryComponent } from './summary.component';
import { NubmerToTimeMockPipe } from 'src/app/test/pipes.mock';
import { Store } from '@ngrx/store';
import { LessonState } from '../../store/reducer';
import { getLessonResult } from '../../store/selectors';
import { of } from 'rxjs';

describe('SummaryComponent', () => {
  let component: SummaryComponent;
  let fixture: ComponentFixture<SummaryComponent>;
  let storeMock: jasmine.SpyObj<Store<LessonState>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SummaryComponent,
        NubmerToTimeMockPipe],
      providers: [
        { provide: Store, useValue: jasmine.createSpyObj('store', ['select', 'unsubscribe']) }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    storeMock = TestBed.get(Store);
    storeMock.select.withArgs(getLessonResult).and.returnValue(of());
    fixture = TestBed.createComponent(SummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
