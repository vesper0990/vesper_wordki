import { WordProviderBase } from './provider-base.service';
import { Observable, of } from 'rxjs';
import { Word } from '@app/common/models/model';
import { MockHelper } from '../_mock-helper';


export class WordProviderMock implements WordProviderBase {

    getWord(wordId: string): Observable<Word> {
        let word: Word;
        for (let i = 0; i < MockHelper.database.groups.length; i++) {
            for (let j = 0; j < MockHelper.database.groups[i].words.length; j++) {
                if(MockHelper.database.groups[i].words[j].id === wordId){
                    word = MockHelper.database.groups[i].words[j];
                    return of<Word>(word);
                }
            }
        }
        return of<Word>(null);
    }

}