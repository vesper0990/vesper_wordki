import { Injectable } from '@angular/core';

@Injectable()
export class WordComparerService {

    isCorrect(original: string, provided: string): boolean {
        return original.toLowerCase() === provided.toLowerCase();
    }
}
