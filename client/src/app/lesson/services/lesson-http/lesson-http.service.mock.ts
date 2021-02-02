import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { CardRepeat } from 'src/app/share/models/card-details';
import { LessonOptions } from '../../models/lesson-options';
import { LessonHttpBaseService } from './lesson-http.service.base';


@Injectable()
export class LessonHttpMockService extends LessonHttpBaseService {

    constructor() {
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

    getTodayWords(): Observable<CardRepeat[]> {
        return of([]);
    }


    getTodayWordsWithParams(contract: any): Observable<CardRepeat[]> {
        return of([]);
    }

    getCountCards(count: number): Observable<CardRepeat[]> {
        return of([]);
    }

    getLessonOptions(): Observable<LessonOptions> {
        return of({} as LessonOptions);
    }
}
