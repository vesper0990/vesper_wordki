import { HttpClient } from '@angular/common/http';
import { getAllMethods } from 'src/app/test/helpers.spec';
import { LoginContract } from './login.contract';
import { RegisterContract } from './register.contract';
import { UserProvider } from './user.provider';
import { UserProviderBase } from './user.provider.base';

describe('UserProvider', () => {

    let service: UserProviderBase;
    let httpClientMock: jasmine.SpyObj<HttpClient>;

    beforeEach(() => {
        httpClientMock = jasmine.createSpyObj(getAllMethods(HttpClient));
        service = new UserProvider(httpClientMock);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should call proper endpoint when login', () => {
        const loginContract = {} as LoginContract;
        service.login(loginContract);

        expect(httpClientMock.put).toHaveBeenCalled();
    });

    it('should call proper endpoint when register', () => {
        const registerContract = {} as RegisterContract;
        service.register(registerContract);

        expect(httpClientMock.post).toHaveBeenCalled();
    });

});
