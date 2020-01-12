import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { WordRepeat } from '../../models/word-repeat';
import { HttpClient } from '@angular/common/http';

@Injectable()
export abstract class WordProviderBase {
    abstract getNextWord(count: number): Observable<WordRepeat[]>;
    abstract sendWord(wordId: number, isCorrect: boolean): Observable<any>;
}

export class WordProvider extends WordProviderBase {
    sendWord(wordId: number, isCorrect: boolean): Observable<any> {
        throw new Error('Method not implemented.');
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
        // return this.http.get<WordRepeat[]>(`http://localhost:5000/getwords/${count}`);
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
        return of<WordRepeat[]>(result);
    }

    sendWord(wordId: number, isCorrect: boolean): Observable<any> {
        console.log('sendWord');
        return of<any>({});
    }

}
