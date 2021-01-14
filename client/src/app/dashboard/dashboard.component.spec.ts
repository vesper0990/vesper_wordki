import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { MockComponent, MockPipe } from 'ng-mocks';
import { ProgressSpinnerComponent } from '../share/components/progress-spinner/progress-spinner.component';
import { Card } from 'primeng/card';
import { DashboardService } from './services/dashboard/dashboard.service';
import { Header } from 'primeng/api';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { DateSpanToDaysPipe } from '../share/pipes/datespan-to-days.pipe';
import { CardComponent } from '../share/components/card/card.component';
import { selectNativeElementById } from '../test/utils.spec';
import { InfoCardComponent } from '../share/components/info-card/info-card.component';
import { ExtendedCardDetails } from '../share/models/card-details';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let service: jasmine.SpyObj<DashboardService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
        MockComponent(ProgressSpinnerComponent),
        MockComponent(Card),
        MockComponent(CardComponent),
        MockComponent(Header),
        MockPipe(DateSpanToDaysPipe),
        MockComponent(InfoCardComponent)
      ],
      providers: [
        {
          provide: DashboardService,
          useValue: jasmine.createSpyObj(['init', 'getLastFailed', 'getNextRepeat', 'getNewestCard',
            'getCardToRepeat', 'getLastRepeat', 'getCardsCount', 'getGroupsCount', 'lesson', 'cards', 'groups', 'history'])
        }
      ]
    }).compileComponents();
  });

  describe('before loaded', () => {

    beforeEach(() => {
      service = TestBed.inject(DashboardService) as jasmine.SpyObj<DashboardService>;
      service.getLastFailed.and.returnValue(of(null));
      service.getNextRepeat.and.returnValue(of(null));
      service.getNewestCard.and.returnValue(of(null));
      service.getCardToRepeat.and.returnValue(of(null));
      service.getLastRepeat.and.returnValue(of(null));
      service.getCardsCount.and.returnValue(of(null));
      service.getGroupsCount.and.returnValue(of(null));

      fixture = TestBed.createComponent(DashboardComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('after loaded', () => {

    beforeEach(() => {
      service = TestBed.inject(DashboardService) as jasmine.SpyObj<DashboardService>;
      service.getLastFailed.and.returnValue(of({ groupName: 'test' } as ExtendedCardDetails));
      service.getNewestCard.and.returnValue(of({ groupName: 'test' } as ExtendedCardDetails));
      service.getNextRepeat.and.returnValue(of({ groupName: 'test' } as ExtendedCardDetails));
      service.getCardToRepeat.and.returnValue(of(1));
      service.getLastRepeat.and.returnValue(of(new Date(2020, 1, 1)));
      service.getCardsCount.and.returnValue(of(1));
      service.getGroupsCount.and.returnValue(of(1));

      fixture = TestBed.createComponent(DashboardComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should show spinner', () => {
      const spinners = fixture.debugElement.queryAll(By.css('app-progress-spinner'));
      expect(spinners.length).toBe(0);
    });

    it('should call lesson', () => {
      selectNativeElementById(fixture, 'lesson-card').click();

      expect(service.lesson).toHaveBeenCalledTimes(1);
    });

    it('should call history', () => {
      selectNativeElementById(fixture, 'history-card').click();

      expect(service.history).toHaveBeenCalledTimes(1);
    });

    it('should call groups', () => {
      selectNativeElementById(fixture, 'groups-card').click();

      expect(service.groups).toHaveBeenCalledTimes(1);
    });

    it('should call cards', () => {
      selectNativeElementById(fixture, 'cards-card').click();

      expect(service.cards).toHaveBeenCalledTimes(1);
    });
  });
});
