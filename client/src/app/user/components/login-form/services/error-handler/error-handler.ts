export enum LoginErrorEnum {
    LoginUserNotFound
}

export function mapErrorCodeToMessage(code: string): string {
    const errorCode = LoginErrorEnum[code];
    switch (errorCode) {
        case LoginErrorEnum.LoginUserNotFound: return 'Invalid username or password';
        default: return '';
    }
}
