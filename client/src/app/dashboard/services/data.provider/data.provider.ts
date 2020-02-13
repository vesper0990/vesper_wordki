import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LastWord } from '../../models/last-word.model';
import { LastWordDto } from '../../models/last-word.dto';
import { LastWordMapper } from '../last-word.mapper/last-word.mapper';
import { RepeatWord } from '../../models/repeat-word.model';
import { RepeatWordDto } from '../../models/reapeat-word.dto';
import { delay } from 'rxjs/operators';

@Injectable()
export abstract class DataProviderBase {
    abstract getLastWords(count: number): Observable<LastWord[]>;
    abstract getNextRepeatWord(): Observable<RepeatWord>;
    abstract getLastFailed(): Observable<RepeatWord>;
}

@Injectable()
export class DataProvider extends DataProviderBase {
    getLastFailed(): Observable<RepeatWord> {
        throw new Error('Method not implemented.');
    }
    getNextRepeatWord(): Observable<RepeatWord> {
        throw new Error('Method not implemented.');
    }
    getLastWords(count: number): Observable<LastWord[]> {
        throw new Error('Method not implemented.');
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
