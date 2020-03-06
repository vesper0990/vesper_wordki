import { Injectable } from '@angular/core';
import { Observable, of, } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { GroupDetailsDto } from '../../models/group-details.dto';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { GroupDetails } from '../../models/group-details.model';
import { GroupDetailsMapper } from '../group-details.mapper/group-details.mapper';
import { Word } from '../../models/word.model';
import { WordMapper } from '../word-mapper/word-mapper';
import { WordDto } from '../../models/word.dto';

@Injectable()
export abstract class GroupDetailsProviderBase {
    abstract getGroupDetails(groupId: number): Observable<GroupDetails>;
    abstract getWords(groupId: number): Observable<Word[]>;
    abstract updateWord(word: Word): Observable<any>;
}

@Injectable()
export class GroupDetailsProvider extends GroupDetailsProviderBase {


    constructor(private http: HttpClient,
        private groupMapper: GroupDetailsMapper,
        private wordMapper: WordMapper) {
        super();
    }

    getGroupDetails(groupId: number): Observable<GroupDetails> {
        return this.http.get<GroupDetailsDto>(`${environment.apiUrl}/getGroup/${groupId}`).pipe(
            map((dto: GroupDetailsDto) => this.groupMapper.map(dto)));
    }

    getWords(groupId: number): Observable<Word[]> {
        return this.http.get<WordDto[]>(`${environment.apiUrl}/getWordsFromGroup/${groupId}`).pipe(
            map((dtos: WordDto[]) => {
                const arr = [];
                dtos.forEach((dto: WordDto) => arr.push(this.wordMapper.map(dto)));
                return arr;
            })
        );
    }

    updateWord(word: Word): Observable<any> {
        const body = {
            wordId: word.id,
            language1: word.language1,
            language2: word.language2,
            isVisible: word.isVisible
        };
        return this.http.put(`${environment.apiUrl}/updateWord`, body);
    }
}

@Injectable()
export class GroupDetailsProviderMock extends GroupDetailsProviderBase {


    constructor(private groupMapper: GroupDetailsMapper,
        private wordMapper: WordMapper) {
        super();
    }

    getGroupDetails(groupId: number): Observable<GroupDetails> {
        const groupDetailsDto: GroupDetailsDto = {
            id: groupId,
            name: `group ${groupId}`,
            language1: 1,
            language2: 2,
            words: []
        };
        for (let i = 0; i < 10; i++) {
            groupDetailsDto.words.push({
                id: 1,
                language1: `word ${i}`,
                language2: `słowo ${i}`,
                drawer: 5 % i
            });
        }
        return of<GroupDetailsDto>(groupDetailsDto).pipe(map((dto: GroupDetailsDto) => this.groupMapper.map(dto)), delay(1000));
    }

    getWords(groupId: number): Observable<Word[]> {
        const arr = [];

        for (let i = 0; i < 10; i++) {
            arr.push({
                id: i,
                language1: `word ${i}`,
                language2: `słowo ${i}`,
                drawer: 5 % i
            });
        }
        return of(arr).pipe(
            map((dtos: WordDto[]) => {
                const arr2 = [];
                dtos.forEach((dto: WordDto) => arr2.push(this.wordMapper.map(dto)));
                return arr2;
            }),
            delay(500)
        );
    }

    updateWord(word: Word): Observable<any> {
        return of({});
    }
}
