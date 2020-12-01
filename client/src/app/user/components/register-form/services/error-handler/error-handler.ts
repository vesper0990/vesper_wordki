export enum RegisterErrorEnum {
    RegisterUserAlreadyExists
}

export function mapErrorCodeToMessage(error: string): string {
    const errorCode = RegisterErrorEnum[error];
    switch (errorCode) {
        case RegisterErrorEnum.RegisterUserAlreadyExists: return 'Username is already registered';
        default: return '';
    }
}
