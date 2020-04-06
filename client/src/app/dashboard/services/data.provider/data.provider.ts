import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RepeatWord } from '../../models/repeat-word.model';
import { RepeatWordDto } from '../../models/reapeat-word.dto';
import { delay, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RepeatWordMapper } from '../repeat-word.mapper/repeat-word.mapper';

@Injectable()
export abstract class DataProviderBase {
    abstract getLastWords(count: number): Observable<RepeatWord[]>;
    abstract getNextRepeatWord(): Observable<RepeatWord>;
    abstract getLastFailed(): Observable<RepeatWord>;
}

@Injectable()
export class DataProvider extends DataProviderBase {

    constructor(private httpClient: HttpClient,
        private repeatWordMapper: RepeatWordMapper) {
        super();
    }

    getLastFailed(): Observable<RepeatWord> {
        return this.httpClient.get<RepeatWordDto>(`${environment.apiUrl}/GetLastFailedWord`).pipe(
            map((dto: RepeatWordDto) => this.repeatWordMapper.map(dto)));
    }

    getNextRepeatWord(): Observable<RepeatWord> {
        return this.httpClient.get<RepeatWordDto[]>(`${environment.apiUrl}/GetNextWords/1/0`).pipe(
            map((dto: RepeatWordDto[]) => this.repeatWordMapper.map(dto[0])));
    }

    getLastWords(count: number): Observable<RepeatWord[]> {
        return this.httpClient.get<RepeatWordDto[]>(`${environment.apiUrl}/GetLastAddedWords/${count}`).pipe(
            map((dto: RepeatWordDto[]) => {
                const arr = [];
                dto.forEach((item: RepeatWordDto) => arr.push(this.repeatWordMapper.map(item)));
                return arr;
            }));
    }
}

@Injectable()
export class DataProviderMock extends DataProviderBase {

    constructor(private mapper: RepeatWordMapper) {
        super();
    }

    getLastWords(count: number): Observable<RepeatWord[]> {
        const arr: RepeatWordDto[] = [];
        for (let i = 1; i <= count; i++) {
            arr.push(<RepeatWordDto>{
                language1: `word${i}`,
                language2: `word${i}`,
                creationDate: '12/09/2019',
            });
        }
        return of(arr.map((dto: RepeatWordDto) => this.mapper.map(dto))).pipe(delay(4000));
    }

    getNextRepeatWord(): Observable<RepeatWord> {
        const dto = <RepeatWordDto>{
            groupName: 'grupa',
            groupLanguage1: 1,
            groupLanguage2: 2,
            language1: 'word1',
            language2: 'word1',
            example1: 'przykład jakiś',
            example2: 'a example',
            drawer: 1,
            creationDate: '01/01/2020',
            repeatsCount: 5,
            lastRepeat: '01/02/2020',
        };
        return of(this.mapper.map(dto)).pipe(delay(300));
    }

    getLastFailed(): Observable<RepeatWord> {
        const dto = <RepeatWordDto>{
            groupName: 'grupa',
            groupLanguage1: 1,
            groupLanguage2: 2,
            language1: 'word1',
            language2: 'word1',
            example1: 'przykład jakiś',
            example2: 'a example',
            drawer: 1,
            creationDate: '01/01/2020',
            repeatsCount: 5,
            lastRepeat: '01/02/2020',
        };
        return of(this.mapper.map(dto)).pipe(delay(500));
    }
}
