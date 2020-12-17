import { Injectable } from '@angular/core';
import { Observable, of, } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { GroupDetailsMapper } from '../group-details.mapper/group-details.mapper';
import { AddedGroup } from '../../models/added-group';
import { EditWord } from 'src/app/share/components/edit-word-dialog/edit-word.model';
import { CardDetails, GroupDetails } from 'src/app/share/models/card-details';
import { GroupDetailsDto } from 'src/app/share/models/dtos/group-details-dto';
import { mapCardDetails, mapGroupDetails } from 'src/app/share/models/mappers';
import { CardDetailsDto } from 'src/app/share/models/dtos/card-details-dto';

@Injectable()
export abstract class GroupDetailsHttpBase {
    abstract getGroupDetails(groupId: number): Observable<GroupDetails>;
    abstract getWords(groupId: number): Observable<CardDetails[]>;
    abstract updateWord(editword: EditWord): Observable<any>;
    abstract addWord(editword: EditWord): Observable<any>;
    abstract removeWord(groupId: number, wordId: number): Observable<any>;
}

@Injectable()
export class GroupDetailsHttp extends GroupDetailsHttpBase {

    constructor(private http: HttpClient) {
        super();
    }

    getGroupDetails(groupId: number): Observable<GroupDetails> {
        return this.http.get<GroupDetailsDto>(`${environment.apiUrl}/group/details/${groupId}`).pipe(
            map((dto: GroupDetailsDto) => mapGroupDetails(dto)));
    }

    getWords(groupId: number): Observable<CardDetails[]> {
        return this.http.get<CardDetailsDto[]>(`${environment.apiUrl}/card/all/${groupId}`).pipe(
            map((dtos: CardDetailsDto[]) => dtos.map(item => mapCardDetails(item)))
        );
    }

    updateWord(editWord: EditWord): Observable<any> {
        const body = {
            id: editWord.id,
            front: {
                value: editWord.language1,
                example: editWord.example1
            },
            back: {
                value: editWord.language2,
                example: editWord.example2
            },
            isVisible: editWord.isVisible
        };
        return this.http.put(`${environment.apiUrl}/card/update`, body);
    }

    addWord(editWord: EditWord): Observable<any> {
        const body = {
            groupId: editWord.groupId,
            front: {
                value: editWord.language1,
                example: editWord.example1
            },
            back: {
                value: editWord.language2,
                example: editWord.example2
            },
            isVisible: editWord.isVisible
        };
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


    constructor() {
        super();
    }

    getGroupDetails(groupId: number): Observable<GroupDetails> {
        const groupDetailsDto: GroupDetailsDto = {
            id: groupId,
            name: `group ${groupId}`,
            languageFront: 1,
            languageBack: 2,
            cardsCount: 1,
            creationDate: "2020/01/01",
            repeatsCount: 3,
        };
        return of<GroupDetailsDto>(groupDetailsDto).pipe(
            map((dto: GroupDetailsDto) => mapGroupDetails(dto)),
            delay(500)
        );
    }

    getWords(groupId: number): Observable<CardDetails[]> {

        const arr: CardDetailsDto[] = [];

        for (let i = 1; i < 10; i++) {
            for (let j = 0; j < 5; j++) {
                const now = new Date();
                now.setDate(now.getDate() - 3);
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
        return of([]).pipe(
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
