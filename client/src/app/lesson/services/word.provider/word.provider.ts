import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { WordRepeat } from '../../models/word-repeat';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { WordRepeatDto } from '../../models/word-repeat.dto';
import { map } from 'rxjs/operators';
import { WordMapper } from '../word-mapper/word-mapper';

@Injectable()
export abstract class WordProviderBase {
    abstract getNextWord(count: number, offset: number): Observable<WordRepeat[]>;
    abstract getWordForLesson(count: number, offect: number, question: number, answer: number): Observable<WordRepeat[]>;
    abstract getWordsFromGroup(groupId: number): Observable<WordRepeat[]>;
    abstract sendWord(wordId: number, result: number): Observable<any>;
    abstract getTodayWords(): Observable<WordRepeat[]>;
}

@Injectable()
export class WordProvider extends WordProviderBase {

    constructor(private http: HttpClient, private mapper: WordMapper) {
        super();
    }

    getWordsFromGroup(groupId: number): Observable<WordRepeat[]> {
        throw new Error('Method not implemented.');
    }

    sendWord(wordId: number, result: number): Observable<any> {
        const body = {
            wordid: wordId,
            result: result
        };
        return this.http.post(`${environment.apiUrl}/AddRepeat`, body);
    }

    getNextWord(count: number, offset: number): Observable<WordRepeat[]> {
        return this.http.get<WordRepeatDto[]>(`${environment.apiUrl}/GetNextWords/${count}/${offset}`).pipe(
            map((dtos: WordRepeatDto[]) => {
                const arr: WordRepeat[] = [];
                dtos.forEach((dto: WordRepeatDto) => arr.push(this.mapper.map(dto)));
                return arr;
            })
        );
    }

    getWordForLesson(count: number, offset: number, question: number, answer: number): Observable<WordRepeat[]> {
        return this.http.get<WordRepeatDto[]>(`${environment.apiUrl}/GetNextWords/${count}/${offset}/${question}/${answer}`).pipe(
            map((dtos: WordRepeatDto[]) => {
                const arr: WordRepeat[] = [];
                dtos.forEach((dto: WordRepeatDto) => arr.push(this.mapper.map(dto)));
                return arr;
            })
        );
    }

    getTodayWords(): Observable<WordRepeat[]> {
        const today = new Date();
        return this.http.get<WordRepeatDto[]>(
            `${environment.apiUrl}/getTodayWords/${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`).pipe(
                map((dto: WordRepeatDto[]) => {
                    const arr = [];
                    dto.forEach((item: WordRepeatDto) => arr.push(this.mapper.map(item)));
                    return arr;
                }));
    }
}

@Injectable()
export class WordProviderMock extends WordProviderBase {

    static index = 1;

    constructor(private mapper: WordMapper) {
        super();
    }

    getNextWord(count: number, offset: number): Observable<WordRepeat[]> {
        const result: WordRepeatDto[] = [];
        while (result.length < count) {
            const i = WordProviderMock.index;
            result.push({
                id: i,
                language1: `word ${i}`,
                language2: `słowo ${i}`,
                drawer: 1
            } as WordRepeatDto);
            WordProviderMock.index++;
        }
        return of<WordRepeatDto[]>(result).pipe(map((dtos: WordRepeatDto[]) => {
            const arr: WordRepeat[] = [];
            dtos.forEach((dto: WordRepeatDto) => arr.push(this.mapper.map(dto)));
            return arr;
        }));
    }

    getWordForLesson(count: number, offset: number, question: number, answer: number): Observable<WordRepeat[]> {
        const result: WordRepeatDto[] = [];
        while (result.length < count) {
            const i = WordProviderMock.index;
            result.push({
                id: i,
                language1: `word ${i}`,
                language2: `słowo ${i}`,
                drawer: 1
            } as WordRepeatDto);
            WordProviderMock.index++;
        }
        return of<WordRepeatDto[]>(result).pipe(map((dtos: WordRepeatDto[]) => {
            const arr: WordRepeat[] = [];
            dtos.forEach((dto: WordRepeatDto) => arr.push(this.mapper.map(dto)));
            return arr;
        }));
    }

    getTodayWords(): Observable<WordRepeat[]> {
        const result: WordRepeatDto[] = [];
        while (result.length < 10) {
            const i = WordProviderMock.index;
            result.push({
                id: i,
                language1: `word ${i}`,
                language2: `słowo ${i}`,
                drawer: 1
            } as WordRepeatDto);
            WordProviderMock.index++;
        }
        return of<WordRepeatDto[]>(result).pipe(map((dtos: WordRepeatDto[]) => {
            const arr: WordRepeat[] = [];
            dtos.forEach((dto: WordRepeatDto) => arr.push(this.mapper.map(dto)));
            return arr;
        }));
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
        return of<any>({});
    }

}
