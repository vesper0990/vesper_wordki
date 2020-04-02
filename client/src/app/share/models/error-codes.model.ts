export enum ErrorCodes {
    Default = 'Default',

    EmptyParameter = 'EmptyParameter',
    EmptyRequest = 'EmptyRequest',

    UserNotFound = 'UserNotFound',

    UserAlreadyExists = 'UserAlreadyExists',
    PasswordNotConfirmed = 'PasswordNotConfirmed'
}

export class ApiException {
    message: string;
    code: ErrorCodes;

    constructor(message: string, code: string) {
        this.message = message;
        this.code = <ErrorCodes>code;
    }
}

