import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { NavigationBarComponentMock } from './test/compontens.mock';
import { UserService } from './authorization/services/user.service/user.service';
import { Subject } from 'rxjs';

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
        NavigationBarComponentMock
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

  // fit(`should have as title 'wordki'`, () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app.title).toEqual('wordki');
  // });
});
