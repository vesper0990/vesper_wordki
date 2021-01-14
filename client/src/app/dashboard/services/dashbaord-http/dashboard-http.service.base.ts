import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExtendedCardDetails } from 'src/app/share/models/card-details';

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
