"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.notSameValidator = exports.RegisterFormComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var error_codes_model_1 = require("src/app/share/models/error-codes.model");
var api_1 = require("primeng/api");
var RegisterFormComponent = /** @class */ (function () {
    function RegisterFormComponent(fb, userProvider, userService, router, messageService) {
        this.fb = fb;
        this.userProvider = userProvider;
        this.userService = userService;
        this.router = router;
        this.messageService = messageService;
        this.userName = this.fb.control('', forms_1.Validators.required);
        this.password = this.fb.control('', forms_1.Validators.required);
        this.passwordConfirmation = this.fb.control('', [forms_1.Validators.required, notSameValidator(this.password)]);
        this.registerForm = this.fb.group({
            userName: this.userName,
            password: this.password,
            passwordConfirmation: this.passwordConfirmation
        });
    }
    RegisterFormComponent.prototype.ngOnInit = function () {
    };
    RegisterFormComponent.prototype.onSubmit = function () {
        var _this = this;
        this.registerForm.disable();
        var registerContract = this.registerForm.value;
        var authenticateContract = this.registerForm.value;
        this.userProvider.register(registerContract).subscribe(function () {
            _this.userProvider.authenticate(authenticateContract).subscribe(function (authenticate) {
                _this.userService.refresh(authenticate);
                _this.router.navigate(['/dashboard']);
            }, function (error) { return _this.handleError(error); });
        }, function (error) { return _this.handleError(error); });
    };
    RegisterFormComponent.prototype.handleError = function (error) {
        this.registerForm.enable();
        switch (error.code) {
            case error_codes_model_1.ErrorCodes.EmptyParameter:
            case error_codes_model_1.ErrorCodes.EmptyRequest:
                this.messageService
                    .add({
                    closable: true,
                    severity: 'error',
                    summary: 'Rejestracja nie powiodła się',
                    detail: 'Błąd aplikacji'
                });
                break;
            case error_codes_model_1.ErrorCodes.UserAlreadyExists:
                this.messageService
                    .add({
                    closable: true,
                    severity: 'error',
                    summary: 'Rejestracja nie powiodło się',
                    detail: 'Nazwa użytkownika jest już zajęta'
                });
                break;
            default:
                this.router.navigate(['/error']);
                break;
        }
    };
    RegisterFormComponent = __decorate([
        core_1.Component({
            selector: 'app-register-form',
            templateUrl: './register-form.component.html',
            styleUrls: ['./register-form.component.scss', '../../styles-users.scss'],
            providers: [api_1.MessageService]
        })
    ], RegisterFormComponent);
    return RegisterFormComponent;
}());
exports.RegisterFormComponent = RegisterFormComponent;
function notSameValidator(comparableControl) {
    return function (control) {
        var isSame = comparableControl.value === control.value;
        return isSame ? null : { 'notSame': { value: control.value } };
    };
}
exports.notSameValidator = notSameValidator;
