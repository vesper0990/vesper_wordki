import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { UserService } from 'src/app/authorization/services/user.service/user.service';
import { LoginContract } from 'src/app/user/services/user.provider/login.contract';
import { RegisterContract } from 'src/app/user/services/user.provider/register.contract';
import { UserProviderBase } from 'src/app/user/services/user.provider/user.provider.base';
import { mapErrorCodeToMessage } from '../error-handler/error-handler';
import { notSameValidator } from '../notSame/notSame.validator';

@Injectable()
export class RegisterService {

    private form: FormGroup;
    private errors: BehaviorSubject<string[]>;

    constructor(private readonly fb: FormBuilder,
        private readonly userHttp: UserProviderBase,
        private readonly userService: UserService,
        private readonly router: Router
    ) {
        this.errors = new BehaviorSubject([]);
    }

    getForm(): FormGroup {
        this.form = this.fb.group({
            userName: this.fb.control('', [Validators.required, Validators.minLength(5)]),
            password: this.fb.control('', [Validators.required, Validators.minLength(5)]),
            passwordConfirmation: this.fb.control('', [Validators.required, notSameValidator('password')])
        });
        return this.form;
    }

    getErrors(): Observable<string[]> {
        return this.errors.asObservable();
    }

    sendRegisterRequest(): void {
        this.form.markAllAsTouched();
        if (this.form.invalid) {
            return;
        }

        const registerContract = {
            userName: this.form.get('userName').value,
            password: this.form.get('password').value,
            passwordConfirmation: this.form.get('passwordConfirmation').value
        } as RegisterContract;

        this.form.disable();
        this.errors.next([]);
        this.userHttp.register(registerContract).pipe(
            tap(() => this.sendLoginRequest()),
            catchError(error => {
                this.form.enable();
                this.errors.next([mapErrorCodeToMessage(error.code)]);
                return of(0);
            })
        ).subscribe();
    }

    private sendLoginRequest(): void {
        const loginContract = {
            userName: this.form.get('userName').value,
            password: this.form.get('password').value,
        } as LoginContract;

        this.form.disable();
        this.userHttp.login(loginContract).pipe(
            tap(token => {
                this.form.enable();
                this.userService.refresh(token);
                this.router.navigate(['/dashboard']);
            }),
            catchError(() => {
                this.router.navigate(['/error']);
                return of(0);
            })
        ).subscribe();
    }
}
