import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { EditWord } from 'src/app/share/components/edit-word-dialog/edit-word.model';
import { CardDetails, GroupDetails } from 'src/app/share/models/card-details';
import { GroupDetailsDto } from 'src/app/share/models/dtos/group-details-dto';
import { mapGroupDetails } from 'src/app/share/models/mappers';
import { CardDetailsDto } from 'src/app/share/models/dtos/card-details-dto';
import { GroupDetailsHttpBase } from './group-details-http.service.base';

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
            creationDate: '2020/01/01',
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

}
