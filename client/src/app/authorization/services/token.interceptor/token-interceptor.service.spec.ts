import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { TokenInterceptorService } from './token-interceptor.service';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { UserService } from '../user.service/user.service';

describe('TokenInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptorService,
        multi: true,
      },
      { provide: UserService, useValue: jasmine.createSpyObj('userService', ['getToken']) },
      HttpClient
    ],
  }));

  it('should be created', () => {
    const service: TokenInterceptorService = TestBed.inject(TokenInterceptorService);
    expect(service).toBeTruthy();
  });

  it('should inject authorization token', () => {
    const httpMock: HttpTestingController = TestBed.inject(HttpTestingController);
    const httpClient: HttpClient = TestBed.inject(HttpClient);
    const userServiceMock = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    userServiceMock.getToken.and.returnValue('token');

    httpClient.get('http://localhost').subscribe();

    const httpRequest = httpMock.expectOne('http://localhost');
    expect(httpRequest.request.headers.has('Authorization')).toEqual(true);
    expect(httpRequest.request.headers.get('Authorization')).toEqual('Bearer token');

  });
});
