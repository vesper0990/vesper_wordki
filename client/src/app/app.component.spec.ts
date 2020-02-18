import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { UserService } from './authorization/services/user.service/user.service';
import { Subject } from 'rxjs';
import { NavigationBarComponent } from './navigation/components/navigation-bar/navigation-bar.component';
import { MockComponent } from 'ng-mocks';

describe('AppComponent', () => {

  let userServiceMock: UserService;

  const testSubject = new Subject<boolean>();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ],
      declarations: [
        AppComponent,
        MockComponent(NavigationBarComponent)
      ],
      providers: [
        {
          provide: UserService,
          useValue: jasmine.createSpyObj('userService', ['subscribe', 'loginFromCookie'])
        }
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    userServiceMock = fixture.debugElement.injector.get(UserService);
    spyOn(userServiceMock, 'subscribe').and.returnValue(testSubject.asObservable());
    const app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    expect(app).toBeTruthy();
  });
});
