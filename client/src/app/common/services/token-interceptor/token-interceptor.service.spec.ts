import { TestBed, async, inject } from '@angular/core/testing';

import { TokenInterceptorService } from './token-interceptor.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { UserServiceMock } from 'src/app/util.mocks';
import { UserService } from '../user/user.service';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../../models/User';

describe('TokenInterceptorService', () => {
  let userServiceMock: UserServiceMock;

  beforeEach(() => {
    userServiceMock = new UserServiceMock();
    userServiceMock.user = <User>{ token: 'test' }
    spyOn(userServiceMock, 'isLogged').and.returnValue(true);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: UserService, useValue: userServiceMock },
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true }
      ]
    });
  });

  it(`should add Authorization header to request`,
    async(
      inject([HttpClient, HttpTestingController], (http: HttpClient, backend: HttpTestingController) => {
        http.get(`http://51.68.136.141:81/test`).subscribe();
        const request = backend.expectOne({}).request;
        expect(request.headers.has('Authorization')).toBeTruthy();
        const correlationId = request.headers.get('Authorization');
        expect(correlationId).toEqual('Bearer test');
      })
    )
  );

  it(`should not add Authorization if url is wrong`,
    async(
      inject([HttpClient, HttpTestingController], (http: HttpClient, backend: HttpTestingController) => {
        http.get(`http://asdf.com/test`).subscribe();
        const request = backend.expectOne({}).request;
        expect(request.headers.has('Authorization')).toBeFalsy();
      })
    )
  );
});
