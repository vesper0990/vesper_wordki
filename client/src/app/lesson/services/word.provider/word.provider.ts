import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { WordRepeat } from '../../models/word-repeat';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { WordRepeatDto } from '../../models/word-repeat.dto';
import { map } from 'rxjs/operators';

@Injectable()
export abstract class WordProviderBase {
    abstract getNextWord(count: number): Observable<WordRepeat[]>;
    abstract getWordsFromGroup(groupId: number): Observable<WordRepeat[]>;
    abstract sendWord(wordId: number, result: number): Observable<any>;
}

@Injectable()
export class WordProvider extends WordProviderBase {

    constructor(private http: HttpClient) {
        super();
    }

    getWordsFromGroup(groupId: number): Observable<WordRepeat[]> {
        throw new Error('Method not implemented.');
    }
    sendWord(wordId: number, resut: number): Observable<any> {
        throw new Error('Method not implemented.');
    }
    getNextWord(count: number): Observable<WordRepeat[]> {
        return this.http.get<WordRepeatDto[]>(`${environment.apiUrl}/GetNextWords/${count}`).pipe(
            map((dtos: WordRepeatDto[]) => {
                const arr = [];
                dtos.forEach((dto: WordRepeatDto) => arr.push(dto)); // todo mapper
                return arr;
            })
        );
    }
}

@Injectable()
export class WordProviderMock extends WordProviderBase {

    static index = 1;

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

    getWordsFromGroup(groupId: number): Observable<WordRepeat[]> {
        const result = [];
        while (result.length < 3) {
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

    sendWord(wordId: number, result: number): Observable<any> {
        console.log('sendWord', result);
        return of<any>({});
    }

}
