import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { WordRepeat } from '../../models/word-repeat';
import { HttpClient } from '@angular/common/http';

@Injectable()
export abstract class WordProviderBase {
    abstract getNextWord(count: number): Observable<WordRepeat[]>;
    abstract async getNextWordAsync(count: number): Promise<WordRepeat[]>;
}

export class WordProvider extends WordProviderBase {
    getNextWordAsync(count: number): Promise<WordRepeat[]> {
        throw new Error("Method not implemented.");
    }
    getNextWord(count: number): Observable<WordRepeat[]> {
        return of<WordRepeat[]>([]);
    }
}

@Injectable()
export class WordProviderMock extends WordProviderBase {

    static index = 0;
    constructor(private http: HttpClient) {
        super();
    }


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

    async getNextWordAsync(count: number): Promise<WordRepeat[]> {
        const start = new Date().getTime();
        console.log('start');
        sleep(1000);
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
        }
        console.log('time:', new Date().getTime() - start);
        return of<WordRepeat[]>(result).toPromise();
    }

}

export function sleep(milliseconds: number) {
    const start = new Date().getTime();
    for (let i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}
