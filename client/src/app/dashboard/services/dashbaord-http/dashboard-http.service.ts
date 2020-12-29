import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LastLessonDto } from '../../models/last-lesson-dto';
import { Never } from 'src/app/share/utils/date-util';
import { ExtendedCardDetails } from 'src/app/share/models/card-details';
import { ExtendedCardDetailsDto } from 'src/app/share/models/dtos/extended-card-details-dto';
import { mapExtendedCardDetails } from 'src/app/share/models/mappers';
import { SideDetailsDto } from 'src/app/share/models/dtos/side-details-dto';

@Injectable()
export abstract class DashboardHttpServiceBase {
    abstract getLastWords(count: number): Observable<ExtendedCardDetails>;
    abstract getNextRepeatWord(): Observable<ExtendedCardDetails>;
    abstract getLastFailed(): Observable<ExtendedCardDetails>;
    abstract getLastLesson(): Observable<Date>;
    abstract getGroupsCount(): Observable<number>;
    abstract getWordsCount(): Observable<number>;
    abstract getTodayRepeatCount(): Observable<number>;
}

@Injectable()
export class DashboardHttpService extends DashboardHttpServiceBase {


    constructor(private httpClient: HttpClient) {
        super();
    }

    getLastFailed(): Observable<ExtendedCardDetails> {
        return this.httpClient.get<ExtendedCardDetailsDto>(`${environment.apiUrl}/card/lastFailed`).pipe(
            map((dto: ExtendedCardDetailsDto) => mapExtendedCardDetails(dto)));
    }

    getNextRepeatWord(): Observable<ExtendedCardDetails> {
        return this.httpClient.get<ExtendedCardDetailsDto>(`${environment.apiUrl}/card/nextRepeat`).pipe(
            map((dto: ExtendedCardDetailsDto) => mapExtendedCardDetails(dto)));
    }

    getLastWords(count: number): Observable<ExtendedCardDetails> {
        return this.httpClient.get<ExtendedCardDetailsDto[]>(`${environment.apiUrl}/card/lastAdded/${count}`).pipe(
            map((dto: ExtendedCardDetailsDto[]) => mapExtendedCardDetails(dto[0])));
    }

    getLastLesson(): Observable<Date> {
        return this.httpClient.get<LastLessonDto>(`${environment.apiUrl}/lesson/lastLessonDate`).pipe(
            map((dto: LastLessonDto) => dto.isAnyLesson ? new Date(dto.date) : Never));
    }

    getGroupsCount(): Observable<number> {
        return this.httpClient.get<number>(`${environment.apiUrl}/group/count`);
    }

    getWordsCount(): Observable<number> {
        return this.httpClient.get<number>(`${environment.apiUrl}/card/count`);
    }

    getTodayRepeatCount(): Observable<number> {
        return this.httpClient.get<number>(`${environment.apiUrl}/lesson/todaysCardCount`);
    }
}

@Injectable()
export class DashboardHttpMockService extends DashboardHttpServiceBase {
    getLastLesson(): Observable<Date> {
        return of(Never);
    }
    getGroupsCount(): Observable<number> {
        return of(4);
    }
    getWordsCount(): Observable<number> {
        return of(87);
    }
    getTodayRepeatCount(): Observable<number> {
        return of(40);
    }

    constructor() {
        super();
    }

    getLastWords(count: number): Observable<ExtendedCardDetails> {
        return of(this.getExtendedCardDetailsDto())
            .pipe(
                delay(300),
                map(x => mapExtendedCardDetails(x))
            );
    }

    getNextRepeatWord(): Observable<ExtendedCardDetails> {
        return of(this.getExtendedCardDetailsDto())
            .pipe(
                delay(300),
                map(x => mapExtendedCardDetails(x))
            );
    }

    getLastFailed(): Observable<ExtendedCardDetails> {
        return of(this.getExtendedCardDetailsDto())
            .pipe(
                delay(500),
                map(x => mapExtendedCardDetails(x))
            );
    }

    private getExtendedCardDetailsDto(): ExtendedCardDetailsDto {
        return {
            id: 1,
            groupName: 'group-name',
            front: {
                value: 'front-value',
                example: 'front-example',
                drawer: 3,
                isVisible: true,
                language: 1,
                nextRepeat: new Date().toUTCString(),
                repeatsCount: 5
            } as SideDetailsDto,
            back: {
                value: 'back-value',
                example: 'back-example',
                drawer: 2,
                isVisible: true,
                language: 0,
                nextRepeat: new Date().toUTCString(),
                repeatsCount: 6
            } as SideDetailsDto
        } as ExtendedCardDetailsDto;
    }
}
