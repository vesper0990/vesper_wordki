import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Never } from 'src/app/share/utils/date-util';
import { ExtendedCardDetails } from 'src/app/share/models/card-details';
import { ExtendedCardDetailsDto } from 'src/app/share/models/dtos/extended-card-details-dto';
import { mapExtendedCardDetails } from 'src/app/share/models/mappers';
import { DashboardHttpServiceBase } from './dashboard-http.service.base';

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
        return this.httpClient.get<any>(`${environment.apiUrl}/lesson/lastLessonDate`).pipe(
            map((dto: any) => dto.isAnyLesson ? new Date(dto.date) : Never));
    }

    getGroupsCount(): Observable<number> {
        return this.httpClient.get<number>(`${environment.apiUrl}/group/count`);
    }

    getWordsCount(): Observable<number> {
        return this.httpClient.get<number>(`${environment.apiUrl}/card/count`);
    }

    getTodayRepeatCount(): Observable<number> {
        return this.httpClient.get<number>(`${environment.apiUrl}/card/repeats?source=1`);
    }
}
