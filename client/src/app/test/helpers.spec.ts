export function getAllMethods(type$: any): any[] {
    return Object.getOwnPropertyNames(type$.prototype)
        .filter(item => item !== 'constructor')
        .filter(item => {
            return typeof type$.prototype[item] === 'function';
        });
}

export function createProvider(type$: any): any {
    return { provide: type$, useValue: jasmine.createSpyObj(getAllMethods(type$)) };
}
