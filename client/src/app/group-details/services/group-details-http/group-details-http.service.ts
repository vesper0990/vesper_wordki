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
import { RepeatDto } from '../../models/repeat.dto';
import { EditWord } from 'src/app/share/components/edit-word-dialog/edit-word.model';

@Injectable()
export abstract class GroupDetailsHttpBase {
    abstract getGroupDetails(groupId: number): Observable<GroupDetails>;
    abstract getWords(groupId: number): Observable<Word[]>;
    // abstract getWordDetails(wordId: number): Observable<>;
    abstract updateWord(editword: EditWord): Observable<any>;
    abstract addWord(editword: EditWord): Observable<any>;
    abstract removeWord(groupId: number, wordId: number): Observable<any>;
    abstract addGroup(group: AddedGroup): Observable<any>;
    abstract changeGroupVisibility(groupId: number): Observable<any>;
}

@Injectable()
export class GroupDetailsHttp extends GroupDetailsHttpBase {

    constructor(private http: HttpClient,
        private groupMapper: GroupDetailsMapper,
        private wordMapper: WordMapper) {
        super();
    }

    getGroupDetails(groupId: number): Observable<GroupDetails> {
        return this.http.get<GroupDetailsDto>(`${environment.apiUrl}/group/details/${groupId}`).pipe(
            map((dto: GroupDetailsDto) => this.groupMapper.map(dto)));
    }

    getWords(groupId: number): Observable<Word[]> {
        return this.http.get<WordDto[]>(`${environment.apiUrl}/card/all/${groupId}`).pipe(
            map((dtos: WordDto[]) => {
                const arr = [];
                dtos.forEach((dto: WordDto) => arr.push(this.wordMapper.map(dto)));
                return arr;
            })
        );
    }

    updateWord(editWord: EditWord): Observable<any> {
        const body = {
            id: editWord.wordId,
            groupId: editWord.groupId,
            heads: {
                value: editWord.language1,
                example: editWord.example1
            },
            tails: {
                value: editWord.language2,
                example: editWord.example2
            },
            comment: editWord.comment,
            isVisible: editWord.isVisible
        };
        return this.http.put(`${environment.apiUrl}/card/update`, body);
    }

    addWord(editword: EditWord): Observable<any> {
        const body = {
            groupId: editword.groupId,
            heads: {
                value: editword.language1,
                example: editword.example1
            },
            tails: {
                value: editword.language2,
                example: editword.example2
            },
            comment: editword.comment,
            isVisible: editword.isVisible
        };
        console.log(editword, body);
        return this.http.post(`${environment.apiUrl}/card/add`, body);
    }

    removeWord(groupId: number, wordId: number): Observable<any> {
        return this.http.delete(`${environment.apiUrl}/card/delete/${wordId}`);
    }

    addGroup(group: AddedGroup): Observable<any> {
        return this.http.post(`${environment.apiUrl}/group/add`, group);
    }

    changeGroupVisibility(groupId: number): Observable<any> {
        const request = {
            id: groupId,
            isAddedToLessons: true
        };
        return this.http.put(`${environment.apiUrl}/changeGroupVisibility`, request);
    }
}

@Injectable()
export class GroupDetailsHttpMock extends GroupDetailsHttpBase {


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
        };
        return of<GroupDetailsDto>(groupDetailsDto).pipe(map((dto: GroupDetailsDto) => this.groupMapper.map(dto)), delay(500));
    }

    getWords(groupId: number): Observable<Word[]> {

        const arr: WordDto[] = [];

        for (let i = 1; i < 10; i++) {
            const repeats: RepeatDto[] = [];
            for (let j = 0; j < 5; j++) {
                const now = new Date();
                now.setDate(now.getDate() - 3);
                repeats.push({
                    result: 1,
                    date: now.toString()
                });
            }

            // arr.push({
            //     id: i,
            //     language1: `word ${i}`,
            //     language2: `słowo ${i}`,
            //     example1: 'to ejst jakis przyklad ktory ma byc poprawnie wyswietlony na stronie',
            //     example2: 'to ejst jakis przyklad ktory ma byc poprawnie wyswietlony na stronie',
            //     drawer: 5 % i,
            //     isVisible: true,
            //     nextRepeat: new Date().toString(),
            //     repeats: repeats
            // });
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

    updateWord(word: EditWord): Observable<any> {
        return of({});
    }

    addWord(editword: EditWord): Observable<any> {
        console.log('mock');
        return of({});
    }

    removeWord(groupId: number, wordId: number): Observable<any> {
        return of({});
    }

    addGroup(group: AddedGroup): Observable<any> {
        return of({});
    }

    changeGroupVisibility(groupId: number): Observable<any> {
        return of({});
    }

}
