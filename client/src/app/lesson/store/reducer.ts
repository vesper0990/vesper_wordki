import { LessonActions } from './actions';
import { Word } from '../model/word.model';

export interface State {
    words: Word[];

}

export const initState: State = {
    words: [],
    
}

export function reducer(state = initState, action: LessonActions): State {
    switch (action.type) {
        default:
            return state;
    }
}