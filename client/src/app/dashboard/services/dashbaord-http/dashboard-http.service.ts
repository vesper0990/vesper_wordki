import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RepeatWord } from '../../models/repeat-word.model';
import { RepeatWordDto } from '../../models/reapeat-word.dto';
import { delay, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { mapToRepeatWord } from '../mapper/mappers';

@Injectable()
export abstract class DashboardHttpServiceBase {
    abstract getLastWords(count: number): Observable<RepeatWord[]>;
    abstract getNextRepeatWord(): Observable<RepeatWord>;
    abstract getLastFailed(): Observable<RepeatWord>;
    abstract getTodayWords(): Observable<RepeatWord[]>;
    abstract getCountWordsByDate(): Observable<number>;
    abstract getInformation(): Observable<any>;
}

@Injectable()
export class DashboardHttpService extends DashboardHttpServiceBase {
    

    constructor(private httpClient: HttpClient) {
        super();
    }

    getLastFailed(): Observable<RepeatWord> {
        return this.httpClient.get<RepeatWordDto>(`${environment.apiUrl}/GetLastFailedWord`).pipe(
            map((dto: RepeatWordDto) => mapToRepeatWord(dto)));
    }

    getNextRepeatWord(): Observable<RepeatWord> {
        return this.httpClient.get<RepeatWordDto[]>(`${environment.apiUrl}/GetNextWords/1/0`).pipe(
            map((dto: RepeatWordDto[]) => mapToRepeatWord(dto[0])));
    }

    getLastWords(count: number): Observable<RepeatWord[]> {
        return this.httpClient.get<RepeatWordDto[]>(`${environment.apiUrl}/GetLastAddedWords/${count}`).pipe(
            map((dto: RepeatWordDto[]) => {
                const arr = [];
                dto.forEach((item: RepeatWordDto) => arr.push(mapToRepeatWord(item)));
                return arr;
            }));
    }

    getTodayWords(): Observable<RepeatWord[]> {
        const today = new Date();
        return this.httpClient.get<RepeatWordDto[]>(
            `${environment.apiUrl}/getTodayWords/${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`).pipe(
                map((dto: RepeatWordDto[]) => {
                    const arr = [];
                    dto.forEach((item: RepeatWordDto) => arr.push(mapToRepeatWord(item)));
                    return arr;
                }));
    }

    getCountWordsByDate(): Observable<number> {
        const today = new Date();
        return this.httpClient.get<any>(
            `${environment.apiUrl}/getCountWordsByDate/${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`).pipe(
                map((dto: any) => {
                    return dto.count;
                }));
    }

    getInformation(): Observable<any> {
        throw new Error('Method not implemented.');
    }
}

@Injectable()
export class DashboardHttpMockService extends DashboardHttpServiceBase {

    constructor() {
        super();
    }

    getCountWordsByDate(): Observable<number> {
        return of<number>(10);
    }

    getTodayWords(): Observable<RepeatWord[]> {
        const arr: RepeatWordDto[] = [];
        for (let i = 1; i <= 10; i++) {
            arr.push({
                groupName: `group`,
                drawer: 1,
                language1: 1,
                language2: 2,
                lastRepeat: '01/01/2020',
                repeatsCount: 3,
                cardSide1: { value: `word${i}`, example: '' },
                cardSide2: { value: `word${i}`, example: '' },
                creationDate: '12/09/2019',
            });
        }
        return of(arr.map((dto: RepeatWordDto) => mapToRepeatWord(dto))).pipe(delay(4000));
    }

    getLastWords(count: number): Observable<RepeatWord[]> {
        const arr: RepeatWordDto[] = [];
        for (let i = 1; i <= count; i++) {
            arr.push(<RepeatWordDto>{
                groupName: `group`,
                drawer: 1,
                language1: 1,
                language2: 2,
                lastRepeat: '01/01/2020',
                repeatsCount: 3,
                cardSide1: { value: `słowo${i}`, example: 'To jest przykład użycia słowa' },
                cardSide2: { value: `word${i}`, example: 'This is an example of word\'s usage' },
                creationDate: '12/09/2019',
            });
        }
        return of(arr.map((dto: RepeatWordDto) => mapToRepeatWord(dto))).pipe(delay(4000));
    }

    getNextRepeatWord(): Observable<RepeatWord> {
        const dto = <RepeatWordDto>{
            groupName: `group`,
            drawer: 1,
            language1: 1,
            language2: 2,
            lastRepeat: '01/01/2020',
            repeatsCount: 3,
            cardSide1: { value: `word`, example: '' },
            cardSide2: { value: `word`, example: '' },
            creationDate: '12/09/2019',
        };
        return of(mapToRepeatWord(dto)).pipe(delay(300));
    }

    getLastFailed(): Observable<RepeatWord> {
        const dto = <RepeatWordDto>{
            groupName: `group`,
            drawer: 1,
            language1: 1,
            language2: 2,
            lastRepeat: '01/01/2020',
            repeatsCount: 3,
            cardSide1: { value: `word`, example: '' },
            cardSide2: { value: `word`, example: '' },
            creationDate: '12/09/2019',
        };
        return of(mapToRepeatWord(dto)).pipe(delay(500));
    }

    getInformation(): Observable<any> {
        const dto = {
            cardToRepeat: 20,
            lastRepeat: 2,
            groupsCount: 10,
            cardsCount: 181
        }
        return of(dto).pipe(delay(500));
    }
}
