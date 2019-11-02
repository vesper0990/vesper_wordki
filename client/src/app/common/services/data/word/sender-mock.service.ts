import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { WordSenderBase, AddWordContract } from './sender-base.service';
import { MockHelper } from '../_mock-helper';
import { Word } from '@app/common/models/Word';

@Injectable()
export class WordSenderMock implements WordSenderBase {

    add(contract: AddWordContract): Observable<string> {
        const newWord = <Word>{
            drawer:0,
            groupId: contract.groupId,
            language1: contract.language1,
            language2: contract.language2,
            language1Example: contract.language1Example,
            language2Example: contract.language2Example,
            isVisible: true,
            repeatingCounter: 0
        }
        for (let i = 0; i < MockHelper.database.groups.length; i++) {
            if (MockHelper.database.groups[i].id === contract.groupId) {
                newWord.id = `${MockHelper.database.groups[i].words.length}`;
                MockHelper.database.groups[i].words.push(newWord);
                break;
            }
        }
        return of<string>(newWord.id);
    }

    addAll(words: Word[]): Observable<Word[]> {
        if (words.length === 0) {
            return of<Word[]>([]);
        }
        for (let i = 0; i < MockHelper.database.groups.length; i++) {
            if (MockHelper.database.groups[i].id === words[0].groupId) {
                for (let j = 0; j < words.length; j++) {
                    words[j].id = `${MockHelper.database.groups[i].words.length}`;
                    MockHelper.database.groups[i].words.push(words[j]);
                }
                break;
            }
        }
        return of<Word[]>(words);
    }

    update(word: Word): Observable<{}> {
        for (let i = 0; i < MockHelper.database.groups.length; i++) {
            if (MockHelper.database.groups[i].id === word.groupId) {
                for (let j = 0; j < MockHelper.database.groups[i].words.length; j++) {
                    if (MockHelper.database.groups[i].words[j].id === word.id) {
                        MockHelper.database.groups[i].words[j].drawer = word.drawer;
                        MockHelper.database.groups[i].words[j].isVisible = word.isVisible;
                        MockHelper.database.groups[i].words[j].language1 = word.language1;
                        MockHelper.database.groups[i].words[j].language1Example = word.language1Example;
                        MockHelper.database.groups[i].words[j].language2 = word.language2;
                        MockHelper.database.groups[i].words[j].language2Example = word.language2Example;
                        MockHelper.database.groups[i].words[j].repeatingCounter = word.repeatingCounter;
                    }
                    break;
                }
                break;
            }
        }
        return of({});
    }

    updateAll(words: Word[]): Observable<{}> {
        if (words.length === 0) {
            return of<Word[]>([]);
        }
        for (let i = 0; i < MockHelper.database.groups.length; i++) {
            if (MockHelper.database.groups[i].id === words[0].groupId) {
                for (let k = 0; k < words.length; k++) {
                    const word = words[k];
                    for (let j = 0; j < MockHelper.database.groups[i].words.length; j++) {
                        if (MockHelper.database.groups[i].words[j].id === word.id) {
                            MockHelper.database.groups[i].words[j].drawer = word.drawer;
                            MockHelper.database.groups[i].words[j].isVisible = word.isVisible;
                            MockHelper.database.groups[i].words[j].language1 = word.language1;
                            MockHelper.database.groups[i].words[j].language1Example = word.language1Example;
                            MockHelper.database.groups[i].words[j].language2 = word.language2;
                            MockHelper.database.groups[i].words[j].language2Example = word.language2Example;
                            MockHelper.database.groups[i].words[j].repeatingCounter = word.repeatingCounter;
                        }
                        break;
                    }
                }
                break;
            }
        }
        return of({});
    }

    remove(word: Word): Observable<{}> {
        for (let i = 0; i < MockHelper.database.groups.length; i++) {
            if (MockHelper.database.groups[i].id === word.groupId) {
                MockHelper.database.groups[i].words = MockHelper.database.groups[i].words.slice(i);
                break;
            }
        }
        return of({});
    }
}
