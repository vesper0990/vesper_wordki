import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LastWord } from '../../models/last-word.model';
import { LastWordDto } from '../../models/last-word.dto';
import { LastWordMapper } from '../last-word.mapper/last-word.mapper';
import { RepeatWord } from '../../models/repeat-word.model';
import { RepeatWordDto } from '../../models/reapeat-word.dto';
import { delay, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RepeatWordMapper } from '../repeat-word.mapper/repeat-word.mapper';

@Injectable()
export abstract class DataProviderBase {
    abstract getLastWords(count: number): Observable<LastWord[]>;
    abstract getNextRepeatWord(): Observable<RepeatWord>;
    abstract getLastFailed(): Observable<RepeatWord>;
}

@Injectable()
export class DataProvider extends DataProviderBase {

    constructor(private httpClient: HttpClient,
        private lastWordMapper: LastWordMapper,
        private repeatWordMapper: RepeatWordMapper) {
        super();
    }

    getLastFailed(): Observable<RepeatWord> {
        return this.httpClient.get<RepeatWordDto>(`${environment.apiUrl}/GetLastFailedWord`).pipe(
            map((dto: RepeatWordDto) => this.repeatWordMapper.map(dto)));
    }

    getNextRepeatWord(): Observable<RepeatWord> {
        return this.httpClient.get<RepeatWordDto>(`${environment.apiUrl}/GetNextWords/1/0`).pipe(
            map((dto: RepeatWordDto) => this.repeatWordMapper.map(dto)));
    }

    getLastWords(count: number): Observable<LastWord[]> {
        return this.httpClient.get<LastWordDto[]>(`${environment.apiUrl}/GetLastAddedWords/${count}`).pipe(
            map((dto: LastWordDto[]) => {
                const arr = [];
                dto.forEach((item: LastWordDto) => arr.push(this.lastWordMapper.map(item)));
                return arr;
            }));
    }
}

@Injectable()
export class DataProviderMock extends DataProviderBase {

    constructor(private mapper: LastWordMapper) {
        super();
    }

    getLastWords(count: number): Observable<LastWord[]> {
        const arr: LastWordDto[] = [];
        for (let i = 1; i <= count; i++) {
            arr.push(<LastWordDto>{
                language1: `word${i}`,
                language2: `word${i}`,
                creationDate: '12/09/2019',
            });
        }
        return of(arr.map((dto: LastWordDto) => this.mapper.map(dto))).pipe(delay(4000));
    }

    getNextRepeatWord(): Observable<RepeatWord> {
        const dto = <RepeatWordDto>{
            language1: 'word1',
            language2: 'word1',
            drawer: 1,
        };
        return of(new RepeatWord(dto.language1, dto.language2, dto.drawer)).pipe(delay(2000));
    }

    getLastFailed(): Observable<RepeatWord> {
        const dto = <RepeatWordDto>{
            language1: 'word1',
            language2: 'word1',
            drawer: 1,
        };
        return of(new RepeatWord(dto.language1, dto.language2, dto.drawer)).pipe(delay(1500));
    }
}
