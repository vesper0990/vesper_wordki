import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { WordRepeat } from '../../models/word-repeat';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { WordRepeatDto } from '../../models/word-repeat.dto';
import { delay, map, tap } from 'rxjs/operators';
import { WordMapper } from '../word-mapper/word-mapper';

@Injectable()
export abstract class LessonHttpBaseService {
    abstract getNextWord(count: number, offset: number): Observable<WordRepeat[]>;
    abstract getWordForLesson(count: number, offect: number, question: number, answer: number): Observable<WordRepeat[]>;
    abstract getWordsFromGroup(groupId: number): Observable<WordRepeat[]>;
    abstract sendWord(wordId: number, result: number): Observable<any>;
    abstract getTodayWords(): Observable<WordRepeat[]>;
    abstract correct(cardId: number): Observable<any>;
    abstract wrong(cardId: number): Observable<any>;
}

@Injectable()
export class LessonHttpService extends LessonHttpBaseService {
    correct(): Observable<any> {
        throw new Error('Method not implemented.');
    }
    wrong(): Observable<any> {
        throw new Error('Method not implemented.');
    }

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
            `${environment.apiUrl}/card/allRepeats`).pipe(
                map((dto: WordRepeatDto[]) => {
                    const arr = [];
                    dto.forEach((item: WordRepeatDto) => arr.push(this.mapper.map(item)));
                    return arr;
                }));
    }
}

@Injectable()
export class LessonHttpMockService extends LessonHttpBaseService {
    correct(cardId: number): Observable<any> {
        return of({}).pipe(
            delay(2000),
            tap(() => console.log('http correct ' + cardId))
        );
    }
    wrong(cardId: number): Observable<any> {
        return of({}).pipe(
            delay(2000),
            tap(() => console.log('http wrong ' + cardId))
        );
    }

    static index = 1;

    constructor(private mapper: WordMapper) {
        super();
    }

    getNextWord(count: number, offset: number): Observable<WordRepeat[]> {
        const result: WordRepeatDto[] = [];
        while (result.length < count) {
            const i = LessonHttpMockService.index;
            result.push({
                id: i,
                language1: `word ${i}`,
                language2: `słowo ${i}`,
                drawer: 1
            } as WordRepeatDto);
            LessonHttpMockService.index++;
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
            const i = LessonHttpMockService.index;
            result.push({
                id: i,
                language1: `word ${i}`,
                language2: `słowo ${i}`,
                drawer: 1
            } as WordRepeatDto);
            LessonHttpMockService.index++;
        }
        return of<WordRepeatDto[]>(result).pipe(map((dtos: WordRepeatDto[]) => {
            const arr: WordRepeat[] = [];
            dtos.forEach((dto: WordRepeatDto) => arr.push(this.mapper.map(dto)));
            return arr;
        }));
    }

    getTodayWords(): Observable<WordRepeat[]> {
        const result: WordRepeatDto[] = [];
        while (result.length < 3) {
            const i = LessonHttpMockService.index;
            result.push({
                id: i,
                language1: `word ${i}, word ${i}, word ${i}`,
                example1: 'THis is an example of sentence where word is used. And this is a very long example. THis is an example of sentence where word is used. And this is a very long example. THis is an example of sentence where word is used. And this is a very long example.',
                language2: `słowo ${i}, słowo ${i}, słowo ${i}`,
                example2: 'To jest bardzo długi przykład zdania gdzie zostało użyte słowo, To jest bardzo długi przykład zdania gdzie zostało użyte słowo, To jest bardzo długi przykład zdania gdzie zostało użyte słowo',
                drawer: 1
            } as WordRepeatDto);
            LessonHttpMockService.index++;
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
            const i = LessonHttpMockService.index;
            result.push({
                id: i,
                language1: `word ${i}`,
                language2: `słowo ${i}`,
                drawer: 1
            });
            LessonHttpMockService.index++;
        }
        return of<WordRepeat[]>(result);
    }

    sendWord(wordId: number, result: number): Observable<any> {
        return of<any>({});
    }

}
