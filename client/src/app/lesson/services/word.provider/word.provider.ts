import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { WordRepeat } from '../../models/word-repeat';

@Injectable()
export abstract class WordProviderBase {
    abstract getNextWord(): Observable<WordRepeat>;
}

export class WordProvider extends WordProviderBase {
    getNextWord(): Observable<any> {
        throw new Error('Method not implemented.');
    }
}

export class WordProviderMock extends WordProviderBase {

    getNextWord(): Observable<WordRepeat> {
        return of<WordRepeat>({
            id: 1,
            language1: 'word',
            language2: 'word',
            drawer: 1
        });
    }

}
