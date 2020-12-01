import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { UserService } from 'src/app/authorization/services/user.service/user.service';
import { LoginContract } from 'src/app/user/services/user.provider/login.contract';
import { UserProviderBase } from 'src/app/user/services/user.provider/user.provider';
import { mapErrorCodeToMessage } from '../error-handler/error-handler';

@Injectable()
export class LoginService {

    private form: FormGroup;
    private errors: BehaviorSubject<string[]>;

    constructor(private readonly fb: FormBuilder,
        private readonly userProvider: UserProviderBase,
        private readonly userService: UserService,
        private readonly router: Router) {
        this.errors = new BehaviorSubject<string[]>([]);
    }

    getForm(): FormGroup {
        this.form = this.fb.group({
            userName: this.fb.control('', [Validators.required, Validators.minLength(5)]),
            password: this.fb.control('', [Validators.required, Validators.minLength(5)]),
        });
        return this.form;
    }

    getErrors(): Observable<string[]> {
        return this.errors.asObservable();
    }

    sendLoginRequest(): void {
        this.form.markAllAsTouched();
        if (this.form.invalid) {
            return;
        }

        const loginContract = {
            userName: this.form.get('userName').value,
            password: this.form.get('password').value,
        } as LoginContract;

        this.form.disable();
        this.errors.next([]);
        this.userProvider.login(loginContract).pipe(
            tap(token => {
                this.form.enable();
                this.userService.refresh(token);
                this.router.navigate(['/dashboard']);
            }),
            catchError(error => {
                this.form.enable();
                this.errors.next([mapErrorCodeToMessage(error.code)]);
                return of(0);
            })
        ).subscribe();
    }
}
