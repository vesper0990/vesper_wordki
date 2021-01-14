export function shuffleArray<T>(arra1: T[]): T[] {
    let ctr = arra1.length;
    let temp: T;
    let index = 0;

    while (ctr > 0) {
        index = Math.floor(Math.random() * ctr);
        ctr--;
        temp = arra1[ctr];
        arra1[ctr] = arra1[index];
        arra1[index] = temp;
    }
    return arra1;
}
