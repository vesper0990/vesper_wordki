import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { WordRepeat } from '../../models/word-repeat';

@Injectable()
export abstract class WordProviderBase {
    abstract getNextWord(count: number): Observable<WordRepeat[]>;
}

export class WordProvider extends WordProviderBase {
    getNextWord(count: number): Observable<WordRepeat[]> {
        return of<WordRepeat[]>([]);
    }
}

export class WordProviderMock extends WordProviderBase {

    static index = 0;

    getNextWord(count: number): Observable<WordRepeat[]> {
        const result = [];
        while (result.length < count) {
            const i = WordProviderMock.index;
            result.push({
                id: i,
                language1: `word ${i}`,
                language2: `słowo ${i}`,
                drawer: 1
            });
            WordProviderMock.index++;
            console.log(WordProviderMock.index);
        }
        return of<WordRepeat[]>(result);
    }

}
