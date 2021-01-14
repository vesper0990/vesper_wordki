import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EditWord } from 'src/app/share/components/edit-word-dialog/edit-word.model';
import { CardDetails, GroupDetails } from 'src/app/share/models/card-details';

@Injectable()
export abstract class GroupDetailsHttpBase {
    abstract getGroupDetails(groupId: number): Observable<GroupDetails>;
    abstract getWords(groupId: number): Observable<CardDetails[]>;
    abstract updateWord(editword: EditWord): Observable<any>;
    abstract addWord(editword: EditWord): Observable<any>;
    abstract removeWord(groupId: number, wordId: number): Observable<any>;
}
