import { TestBed, async, inject } from '@angular/core/testing';
import { UserProvider } from './provider-api.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserRequest } from '../model/UserRequest';

describe('ServiceService', () => {
    let service: UserProvider;
    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            HttpClientModule,
            HttpClientTestingModule
        ],
        providers: [
            UserProvider
        ]
    }));

    beforeEach(() => {
        service = TestBed.get(UserProvider);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should call getUser',
        async(
            inject([HttpTestingController], (backend: HttpTestingController) => {
                const request: UserRequest = { userName: 'userName', password: 'password' };
                service.getUser(request).subscribe();
                const req = backend.expectOne({
                    url: 'http://localhost:5000/Users/user/userName/password',
                    method: 'GET'
                });
                expect(req).toBeTruthy();
            })
        ));

    // it('should call login',
    //     async(
    //         inject([HttpTestingController], (backend: HttpTestingController) => {
    //             const request: LoginRequest = { userName: 'userName', password: 'password' };
    //             service.login(request).subscribe();
    //             const req = backend.expectOne({
    //                 url: 'http://51.68.136.141:81/User/login',
    //                 method: 'PUT'
    //             });
    //             expect(JSON.stringify(req.request.body))
    //                 .toEqual(`{'userName':'userName','password':'password'}`);
    //         })
    //     ));

    // it('should call register',
    //     async(
    //         inject([HttpTestingController], (backend: HttpTestingController) => {
    //             const request: RegisterRequest = { userName: 'userName', password: 'password', passwordRepeat: 'password' };
    //             service.register(request).subscribe();
    //             const req = backend.expectOne({
    //                 url: 'http://51.68.136.141:81/User/register',
    //                 method: 'POST'
    //             });
    //             expect(JSON.stringify(req.request.body))
    //                 .toEqual(`{'userName':'userName','password':'password','passwordRepeat':'password'}`);
    //         })
    //     ));
});
