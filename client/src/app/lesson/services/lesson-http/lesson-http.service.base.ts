import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CardRepeat } from 'src/app/share/models/card-details';
import { LessonOptions } from '../../models/lesson-options';

@Injectable()
export abstract class LessonHttpBaseService {

    abstract createLesson(): Observable<number>;
    abstract getTodayWords(): Observable<CardRepeat[]>;
    abstract getTodayWordsWithParams(contract: any): Observable<CardRepeat[]>;
    abstract getCountCards(count: number): Observable<CardRepeat[]>;
    abstract getLessonOptions(): Observable<LessonOptions>;
    abstract correct(lessonId: number, wordId: number, questionSide: string): Observable<any>;
    abstract wrong(lessonId: number, wordId: number, questionSide: string): Observable<any>;
    abstract accept(lessonId: number, wordId: number, questionSide: string): Observable<any>;
    abstract finish(lessonId: number, span: number): Observable<any>;
}
