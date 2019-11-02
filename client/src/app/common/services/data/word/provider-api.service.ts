import { Injectable } from '@angular/core';
import { WordProviderBase } from './provider-base.service';
import { Observable } from 'rxjs';
import { Word } from '@app/common/models/Word';
import { HttpClient } from '@angular/common/http';
import { UrlsProvider } from '../urls.provider';

@Injectable()
export class WordProvider implements WordProviderBase {
    
    constructor(private http: HttpClient) {
        
    }
    
    getWord(wordId: string): Observable<Word> {
        return this.http.get<Word>(`${UrlsProvider.wordGet}/${wordId}`);
    }

}
