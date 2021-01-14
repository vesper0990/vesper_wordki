import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CardRepeat } from 'src/app/share/models/card-details';

@Injectable()
export abstract class LessonHttpBaseService {

    abstract createLesson(): Observable<number>;
    abstract getTodayWords(): Observable<CardRepeat[]>;
    abstract correct(lessonId: number, wordId: number, questionSide: string): Observable<any>;
    abstract wrong(lessonId: number, wordId: number, questionSide: string): Observable<any>;
    abstract accept(lessonId: number, wordId: number, questionSide: string): Observable<any>;
    abstract finish(lessonId: number, span: number): Observable<any>;
}
