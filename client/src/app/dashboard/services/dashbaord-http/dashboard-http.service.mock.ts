import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Never } from 'src/app/share/utils/date-util';
import { ExtendedCardDetails } from 'src/app/share/models/card-details';
import { ExtendedCardDetailsDto } from 'src/app/share/models/dtos/extended-card-details-dto';
import { mapExtendedCardDetails } from 'src/app/share/models/mappers';
import { SideDetailsDto } from 'src/app/share/models/dtos/side-details-dto';
import { DashboardHttpServiceBase } from './dashboard-http.service.base';


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
