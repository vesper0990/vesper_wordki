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
import { AddedGroup } from '../../models/added-group';
import { AddedWord } from '../../models/added-word';

@Injectable()
export abstract class GroupDetailsProviderBase {
    abstract getGroupDetails(groupId: number): Observable<GroupDetails>;
    abstract getWords(groupId: number): Observable<Word[]>;
    abstract updateWord(word: Word, groupId: number): Observable<any>;
    abstract addWord(word: Word, groupId: number): Observable<any>;
    abstract removeWord(word: Word): Observable<any>;
    abstract addGroup(group: AddedGroup): Observable<any>;
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

    updateWord(word: Word, groupId: number): Observable<any> {
        const body = {
            wordId: word.id,
            language1: word.language1,
            language2: word.language2,
            isVisible: word.isVisible,
            groupId: groupId
        };
        return this.http.put(`${environment.apiUrl}/updateWord`, body);
    }

    addWord(word: Word, groupId: number): Observable<any> {
        console.log('test');
        const body = {
            wordId: word.id,
            language1: word.language1,
            language2: word.language2,
            isVisible: word.isVisible,
            groupId: groupId
        };
        return this.http.post(`${environment.apiUrl}/addWord`, body);
    }

    removeWord(word: Word): Observable<any> {
        return this.http.delete(`${environment.apiUrl}/removeWord/${word.group.id}/${word.id}`);
    }

    addGroup(group: AddedGroup): Observable<any> {
        return this.http.post(`${environment.apiUrl}/addGroup`, group);
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
                wordId: 1,
                language1: `word ${i}`,
                language2: `słowo ${i}`,
                example1: `to ejst jakis przyklad ktory ma byc poprawnie wyswietlony na stronie`,
                example2: `to ejst jakis przyklad ktory ma byc poprawnie wyswietlony na stronie`,
                drawer: 5 % i,
                isVisible: true,
                nextRepeat: new Date().toString()
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
                drawer: 5 % i,
                isVisible: true
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

    updateWord(word: Word, groupId: number): Observable<any> {
        return of({});
    }

    addWord(word: Word, groupId: number): Observable<any> {
        return of({});
    }

    removeWord(word: Word): Observable<any> {
        return of({});
    }

    addGroup(group: AddedGroup): Observable<any> {
        return of({});
    }

}
