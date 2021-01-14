import { Injectable } from '@angular/core';
import { Observable, } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { EditWord } from 'src/app/share/components/edit-word-dialog/edit-word.model';
import { CardDetails, GroupDetails } from 'src/app/share/models/card-details';
import { GroupDetailsDto } from 'src/app/share/models/dtos/group-details-dto';
import { mapCardDetails, mapGroupDetails } from 'src/app/share/models/mappers';
import { CardDetailsDto } from 'src/app/share/models/dtos/card-details-dto';
import { GroupDetailsHttpBase } from './group-details-http.service.base';

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
}
