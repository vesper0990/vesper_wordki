import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { WordRepeat } from '../../models/word-repeat';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LessonCardDto, WordRepeatDto } from '../../models/word-repeat.dto';
import { delay, map, tap } from 'rxjs/operators';
import { WordMapper } from '../word-mapper/word-mapper';
import { CardRepeat } from 'src/app/share/models/card-details';
import { mapCardRepeat } from 'src/app/share/models/mappers';

@Injectable()
export abstract class LessonHttpBaseService {

    abstract createLesson(): Observable<number>;
    abstract getNextWord(count: number, offset: number): Observable<WordRepeat[]>;
    abstract getWordForLesson(count: number, offect: number, question: number, answer: number): Observable<WordRepeat[]>;
    abstract getWordsFromGroup(groupId: number): Observable<WordRepeat[]>;
    abstract sendWord(wordId: number, result: number): Observable<any>;
    abstract getTodayWords(): Observable<CardRepeat[]>;
    abstract correct(lessonId: number, wordId: number, questionSide: string): Observable<any>;
    abstract wrong(lessonId: number, wordId: number, questionSide: string): Observable<any>;
    abstract accept(lessonId: number, wordId: number, questionSide: string): Observable<any>;
    abstract finish(lessonId: number, span: number): Observable<any>;
}

@Injectable()
export class LessonHttpService extends LessonHttpBaseService {

    constructor(private http: HttpClient, private mapper: WordMapper) {
        super();
    }

    createLesson(): Observable<number> {
        console.log('createLesson');
        return this.http.post<number>(`${environment.apiUrl}/lesson/start`, null);
    }

    correct(cardId: number, lessonId: number, questionSide: string): Observable<any> {
        const body = {
            lessonId: lessonId,
            cardId: cardId,
            questionSide: 'Heads',
            repeatReuslt: 'Correct'
        };
        return this.http.post(`${environment.apiUrl}/lesson/answer`, body);
    }

    wrong(cardId: number, lessonId: number, questionSide: string): Observable<any> {
        const body = {
            lessonId: lessonId,
            cardId: cardId,
            questionSide: 'Heads',
            repeatReuslt: 'Wrong'
        };
        return this.http.post(`${environment.apiUrl}/lesson/answer`, body);
    }

    accept(cardId: number, lessonId: number, questionSide: string): Observable<any> {
        const body = {
            lessonId: lessonId,
            cardId: cardId,
            questionSide: 'Heads',
            repeatReuslt: 'Accepted'
        };
        return this.http.post(`${environment.apiUrl}/lesson/answer`, body);
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

    getTodayWords(): Observable<CardRepeat[]> {
        return this.http.get<LessonCardDto[]>(`${environment.apiUrl}/card/allRepeats`).pipe(
            map(dtos => dtos.map(dto => mapCardRepeat(dto)))
        );
    }

    finish(lessonId: number, span: number): Observable<any> {
        const body = {
            lessonId: lessonId,
            span: span
        };
        return this.http.put<any>(`${environment.apiUrl}/lesson/finish`, body);
    }
}

@Injectable()
export class LessonHttpMockService extends LessonHttpBaseService {

    constructor(private mapper: WordMapper) {
        super();
    }

    static index = 1;
    finish(lessonId: number): Observable<any> {
        return of({});
    }

    createLesson(): Observable<number> {
        return of(1);
    }

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

    accept(cardId: number): Observable<any> {
        return of({}).pipe(
            delay(2000),
            tap(() => console.log('http wrong ' + cardId))
        );
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

    getTodayWords(): Observable<CardRepeat[]> {
        return of([]);
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
