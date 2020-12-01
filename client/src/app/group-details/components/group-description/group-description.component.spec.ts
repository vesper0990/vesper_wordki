import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockPipe } from 'ng-mocks';
import { DateSpanToDaysPipe } from 'src/app/share/pipes/datespan-to-days.pipe';
import { GroupDescriptionComponent } from './group-description.component';

describe('GroupDescriptionComponent', () => {
  let component: GroupDescriptionComponent;
  let fixture: ComponentFixture<GroupDescriptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        GroupDescriptionComponent,
        MockPipe(DateSpanToDaysPipe)
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
