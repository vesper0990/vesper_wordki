import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { CookieService } from 'ngx-cookie-service';

describe('UserService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      {
        provide: CookieService,
        useValue: jasmine.createSpyObj('cookieService', [''])
      }
    ]
  }));

  it('should be created', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });
});
