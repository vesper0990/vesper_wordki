import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoperComponent } from './stoper.component';
import { createProvider } from 'src/app/test/helpers.spec';
import { StoperService } from './services/stoper/stoper.service';
import { MockPipe } from 'ng-mocks';
import { SecToTimePipe } from 'src/app/share/pipes/sec-to-time.pipe';
import { of } from 'rxjs';
import { selectAllDebugElements } from 'src/app/test/utils.spec';
import { LessonStep } from '../../models/lesson-state';

describe('StoperComponent', () => {
  let component: StoperComponent;
  let fixture: ComponentFixture<StoperComponent>;
  let service: jasmine.SpyObj<StoperService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        StoperComponent,
        MockPipe(SecToTimePipe)
      ],
      providers: [
        createProvider(StoperService),
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    service = TestBed.inject(StoperService) as jasmine.SpyObj<StoperService>;
    service.getLessonStep.and.returnValue(of(null));
    service.getTime.and.returnValue(of(null));

    fixture = TestBed.createComponent(StoperComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('no lesson step', () => {
    beforeEach(() => {
      service.getLessonStep.and.returnValue(of(null));
      fixture.detectChanges();
    });

    it('should display no buttons', () => {
      const buttons = selectAllDebugElements(fixture, 'button');

      expect(buttons.length).toBe(0);
    });
  });

  describe('display start btn', () => {
    beforeEach(() => {
      service.getLessonStep.and.returnValue(of({ startBtn: true } as LessonStep));
      fixture.detectChanges();
    });

    it('should display start button', () => {
      const buttons = selectAllDebugElements(fixture, 'button');

      expect(buttons.length).toBe(1);
      buttons[0].nativeElement.click();

      expect(service.start).toHaveBeenCalledTimes(1);
    });
  });

  describe('display finish btn', () => {
    beforeEach(() => {
      service.getLessonStep.and.returnValue(of({ finishBtn: true } as LessonStep));
      fixture.detectChanges();
    });

    it('should display finish button', () => {
      const buttons = selectAllDebugElements(fixture, 'button');

      expect(buttons.length).toBe(1);
      buttons[0].nativeElement.click();

      expect(service.finish).toHaveBeenCalledTimes(1);
    });
  });

  describe('display pause btn', () => {
    beforeEach(() => {
      service.getLessonStep.and.returnValue(of({ pauseBtn: true } as LessonStep));
      fixture.detectChanges();
    });

    it('should display pause button', () => {
      const buttons = selectAllDebugElements(fixture, 'button');

      expect(buttons.length).toBe(1);
      buttons[0].nativeElement.click();

      expect(service.pause).toHaveBeenCalledTimes(1);
    });
  });

  describe('display restart btn', () => {
    beforeEach(() => {
      service.getLessonStep.and.returnValue(of({ restartBtn: true } as LessonStep));
      fixture.detectChanges();
    });

    it('should display restart button', () => {
      const buttons = selectAllDebugElements(fixture, 'button');

      expect(buttons.length).toBe(1);
      buttons[0].nativeElement.click();

      expect(service.resume).toHaveBeenCalledTimes(1);
    });
  });
});
