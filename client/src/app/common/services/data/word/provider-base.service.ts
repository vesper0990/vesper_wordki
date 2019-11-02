import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Word } from '@app/common/models/Word';

@Injectable()
export abstract class WordProviderBase {
    abstract getWord(wordId: string): Observable<Word>;
}
