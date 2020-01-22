export enum LanguageTypeEnum {
    Undefine,
    Polish,
    English
}

export class LanguageType {

    private static readonly map = new Map<LanguageTypeEnum, LanguageType>()
        .set(LanguageTypeEnum.Undefine,
            new LanguageType(LanguageTypeEnum.Undefine, 'undefined'))
        .set(LanguageTypeEnum.Polish,
            new LanguageType(LanguageTypeEnum.Polish, 'polski'))
        .set(LanguageTypeEnum.English,
            new LanguageType(LanguageTypeEnum.English, 'english'));

    readonly type: LanguageTypeEnum;
    readonly label: string;

    constructor(type: LanguageTypeEnum, label: string) {
        this.type = type;
        this.label = label;
    }

    static getLanguageType(typeEnum: LanguageTypeEnum): LanguageType {
        return this.map.get(typeEnum);
    }

    static getAll(): LanguageType[] {
        return Array.from<LanguageType>(this.map.values());
    }
}
