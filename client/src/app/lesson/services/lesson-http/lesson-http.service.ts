import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LessonCardDto } from '../../models/word-repeat.dto';
import { map } from 'rxjs/operators';
import { CardRepeat } from 'src/app/share/models/card-details';
import { mapCardRepeat } from 'src/app/share/models/mappers';
import { LessonHttpBaseService } from './lesson-http.service.base';

@Injectable()
export class LessonHttpService extends LessonHttpBaseService {

    constructor(private http: HttpClient) {
        super();
    }

    createLesson(): Observable<number> {
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


