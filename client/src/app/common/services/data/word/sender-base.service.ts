import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Word } from '@app/common/models/Word';
import { UrlsProvider } from '../urls.provider';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable()
export abstract class WordSenderBase {

    abstract add(contract: AddWordContract): Observable<string>;
    abstract addAll(words: Word[]): Observable<Word[]>;
    abstract update(contract: UpdateWordContract): Observable<{}>;
    abstract updateAll(words: Word[]): Observable<{}>;
    abstract remove(word: Word): Observable<{}>;

}

@Injectable()
export class WordSender implements WordSenderBase {

    constructor(private http: HttpClient) { }

    add(contract: AddWordContract): Observable<string> {
        const options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
        };
        return this.http.post<string>(UrlsProvider.wordAdd, contract, options);
    }

    addAll(words: Word[]): Observable<Word[]> {
        const options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
        };
        return this.http.post<Word[]>(UrlsProvider.wordAddAll, words, options);
    }

    update(contract: UpdateWordContract): Observable<{}> {
        const options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
        };
        return this.http.put(UrlsProvider.wordUpdate, contract, options);
    }

    updateAll(words: Word[]): Observable<{}> {
        const options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
        };
        return this.http.put(UrlsProvider.wordsUpdateAll, { words: words }, options);
    }

    remove(word: Word): Observable<{}> {
        const options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
        };
        return this.http.delete(UrlsProvider.wordsRemove + '/' + word.id, options);
    }
}


export class AddWordContract {
    groupId: string;
    language1: string;
    language2: string;
    language1Example: string;
    language2Example: string;
    visibility: boolean;
}

export class UpdateWordContract {
    id: string;
    language1: string;
    language2: string;
    language1Example: string;
    language2Example: string;
    isVisible: boolean;
    drawer: number;
}
