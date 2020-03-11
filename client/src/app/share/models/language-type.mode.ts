export enum LanguageTypeEnum {
    Undefined = 0,
    Polish,
    English
}

export class LanguageType {

    private static readonly map = new Map<LanguageTypeEnum, LanguageType>()
        .set(LanguageTypeEnum.Undefined,
            new LanguageType(LanguageTypeEnum.Undefined, 'undefined', 'undefined.svg'))
        .set(LanguageTypeEnum.Polish,
            new LanguageType(LanguageTypeEnum.Polish, 'polski', 'polish.svg'))
        .set(LanguageTypeEnum.English,
            new LanguageType(LanguageTypeEnum.English, 'english', 'english.svg'));

    readonly type: LanguageTypeEnum;
    readonly label: string;
    readonly flag: string;
    readonly value: 1;

    constructor(type: LanguageTypeEnum, label: string, flag: string) {
        this.type = type;
        this.label = label;
        this.flag = flag;
    }

    static getLanguageType(typeEnum: LanguageTypeEnum): LanguageType {
        return this.map.get(typeEnum);
    }

    static getAll(): LanguageType[] {
        return Array.from<LanguageType>(this.map.values());
    }

    public toString = (): string => {
        return 'test';
    }
}
