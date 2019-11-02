import { UserActions } from './actions';

export interface State {

}

export const initState: State = {

}

export function reducer(state = initState, action: UserActions): State {
    switch (action.type) {
        default:
            return state;
    }
}